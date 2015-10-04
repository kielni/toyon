var request = require("request"),
    cheerio = require("cheerio"),
    async = require("async"),
    fs = require("fs"),
    jf = require("jsonfile"),
    _ = require("lodash");

var searchBase = "http://www.smgrowers.com/search/basesearch.asp?strSearchText=";
var detailPrefix = "../products/plants/plantdisplay.asp?";
var detailBase = "http://www.smgrowers.com/products/plants/plantdisplay.asp?plant_id=";

if (process.argv.length < 3) {
    console.log("usage: node scrape_san_marcos.js <plantdb.json>");
    process.exit(1);
}
var plantdb = jf.readFileSync(process.argv[2], "utf-8");

var plants = plantdb.plants;

var search = function(plant, callback) {
    //console.log("search "+plant.name);
    var url = searchBase+encodeURIComponent(plant.name.search);
    //console.log("search: "+plant.name.search+" url="+url);
    request(url, function(err, response, body) {
        plant.search = { sanMarcos: { matches: [] } };
        if (err) throw err;
        //console.log("body=\n-----"+body+"\n-----");
        if (body.indexOf("no results") >= 0) {
            callback(null, plant);
            return;
        }
        var match = body.match(/\d+ - \d+ of (\d+)/);
        var total = match && match.length > 1 ? parseInt(match[1]) : 0;
        var $ = cheerio.load(body);
        // look for URL like ../products/plants/plantdisplay.asp?
        $("a").each(function() {
            var href = $(this).attr("href");
            var name = $(this).text().trim();
            if (href.indexOf(detailPrefix) < 0) {
                return;
            }
            var match = href.match(/plant_id=(\d+)/);
            if (match) {
                // short description
                var desc = $(this).parent().parent().find("td").eq(2).text().trim();
                desc = desc.replace(/\r\n/, "");
                plant.search.sanMarcos.matches.push({id: match[1], name: name, description: desc});
            }
        });
        //console.log("search: name="+plant.name.search+"\t"+plant.search.sanMarcos.matches.length+" matches");
        callback(null, plant);
    });
};

var detail = function(plant, callback) {
    if (!plant || !plant.search || !plant.search.sanMarcos || 
        !plant.search.sanMarcos.matches || plant.search.sanMarcos.matches.length === 0) {
        callback(null, plant);
        return;
    }
    // get the first match
    var match = plant.search.sanMarcos.matches[0];
    plant.name.sanMarcos = match.name;
    var url = detailBase+match.id;
    //console.log("detail "+url);
    var fields = {"Height": "height", "Width": "spread", "Exposure":"sun"};
    request(url, function(err, response, body) {
        if (err) throw err;
        var $ = cheerio.load(body);
        $("td").each(function() {
            var td = $(this).text().trim();
            _.keys(fields).forEach(function(field) {
                if (td.indexOf(field) >= 0) {
                    var key = fields[field];
                    if (!plant[key]) {
                        plant[key] = {};
                    }
                    plant[key].sanMarcos = td.substr((field+": ").length);
                }
            });
            var water = td.match(/Irrigation.*?: (.*)/);
            if (water) {
                if (!plant.water) {
                    plant.water = {};
                }
                plant.water.sanMarcos = water[1];
            }
        });
        $("img").each(function() {
            var imgUrl = $(this).attr("src");
            if (imgUrl.indexOf("http://www.smgrowers.com/imagedb") === 0) {
                if (!plant.photos) {
                    plant.photos = {};
                }
                if (!plant.photos.sanMarcos) {
                    plant.photos.sanMarcos = [];
                }
                plant.photos.sanMarcos.push(imgUrl);
            }
        });
        callback(null, plant);
    });
};

var scrape = async.compose(detail, search);

var id = 1;
async.forEachSeries(plants, function(plant, forEachCallback) {
    plant.id = id++;
    async.waterfall([
        function(callback) {
            console.log("search:\t"+plant.id+"\t"+plant.name.search);
            search(plant, callback);
        },
        function(plant, callback) {
            detail(plant, callback);
        }
    ], function(err) {
        //console.log("done plant "+plant.id);
        forEachCallback();
    });
}, function(err) {
    //console.log("done "+plants.length+" plants");
    console.log(JSON.stringify({"plants": plants}, null, 2));
});

