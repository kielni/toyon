var request = require("request"),
    cheerio = require("cheerio"),
    async = require("async"),
    fs = require("fs"),
    jf = require("jsonfile"),
    _ = require("lodash");

if (process.argv.length < 3) {
    console.log("usage: node scrape_missouri_botanical.js <plantdb.json>");
    process.exit(1);
}
var plantdb = jf.readFileSync(process.argv[2], "utf-8");

var plants = plantdb.plants;

var base = "http://www.missouribotanicalgarden.org/PlantFinder/";
var searchBase = base+"PlantFinderListResults.aspx?basic=";
var detailBase = base+"PlantFinderDetails.aspx?taxonid=";

var search = function(plant, callback) {
    var url = searchBase+encodeURIComponent(plant.name.search);
    console.log("scrape: "+plant.id+"\t"+plant.name.search+" url="+url);
    request(url, function(err, response, body) {
        plant.search = { missouriBotanical: { matches: [] } };
        if (err) throw err;
        var $ = cheerio.load(body);
        //console.log("body=", body);
        var results = $("#dnn_ctr4157_SearchResults_pnlList div");
        if (!results.length) {
            console.log("\tscrape: no matches");
            callback(null, plant);
            return;
        }
        $(results).each(function() {
            var link = $(this).find("a").first();
            var match = $(link).attr("href").match(/taxonid=(\d+)/);
            var taxonId = match && match.length > 1 ? match[1] : null;
            var name = $(link).text().trim();
            plant.search.missouriBotanical.matches.push({id: taxonId, name: name});
        });
        console.log("\tscrape: "+plant.search.missouriBotanical.matches.length+" matches");
        callback(null, plant);
    });
};

var detail = function(plant, callback) {
    if (!plant || !plant.search || !plant.search.missouriBotanical || 
        !plant.search.missouriBotanical.matches || plant.search.missouriBotanical.matches.length === 0) {
        callback(null, plant);
        return;
    }
    // get the first match
    var match = plant.search.missouriBotanical.matches[0];
    plant.name.missouriBotanical = match.name;
    var url = detailBase+match.id;
    var idPrefix = "#MainContentPlaceHolder_";
    var fields = {
        height: { id: "HeightRow", prefix: "Height: " },
        spread: { id: "SpreadRow", prefix: "Spread: "}, 
        sun: { id: "SunRow", prefix: "Sun: "},
        water: { id: "WaterRow", prefix: "Water: "}
    };
    request(url, function(err, response, body) {
        if (err) throw err;
        var $ = cheerio.load(body);
        _.keys(fields).forEach(function(key) {
            var field = fields[key];
            var value = $(idPrefix+field.id).text().trim();
            value = value.replace(field.prefix, "");
            console.log("\tscrape: "+key+" = "+value);
            if (!plant[key]) {
                plant[key] = {};
            }
            plant[key].missouriBotanical = value;
        });
        var img = $("#MainContentPlaceHolder_PrimaryImageLink img");
        if (img) {
            console.log("\tscrape: img = "+$(img).attr("src"));
            if (!plant.photos) {
                plant.photos = {};
            }
            plant.photos.missouriBotanical = [$(img).attr("src")];
        }
        callback(null, plant);
    });
};

var scrape = async.compose(detail, search);

async.forEachSeries(plants, function(plant, forEachCallback) {
    async.waterfall([
        function(callback) {
            search(plant, callback);
        },
        function(plant, callback) {
            detail(plant, callback);
        }
    ], function(err) {
        forEachCallback();
    });
}, function(err) {
    console.log(JSON.stringify({"plants": plants}, null, 2));
});
