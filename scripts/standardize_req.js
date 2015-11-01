var jf = require("jsonfile");

if (process.argv.length < 4) {
    console.log("usage: node standard_req.js <plantdb.json> <labels.json>");
    process.exit(1);
}

/*
    standardize requirements:

    height.[missouriBotanical,sanMarcoos] -> height.min, height.max, height.source
    spread.[missouriBotanical,sanMarcoos] -> spread.min, spread.max, spread.source
    sun.[missouriBotanical,sanMarcoos] -> sun.min, sun.max, sun.source
    water.from, water.to -> water.range = [x,y,z]
*/
var plantdb = jf.readFileSync(process.argv[2], "utf-8");
var plants = plantdb.plants;

/*
    "sun": { "Sun or Shade": ["sun", "part", "sun"], ...}
    "height": { "4-5 feet": { "from": 4, "to": 5}, ...}
    "spread": { "0.75 to 1.00 feet": { "from": 0.75, "to": 1}, ...}
*/
var labels = jf.readFileSync(process.argv[3], "utf-8");
var water = ["N", "L", "M", "H"];

plants.forEach(function(plant) {
    var keep = 0;
    plant.water.range = water.slice(water.indexOf(plant.water.from), water.indexOf(plant.water.to)+1);
    delete plant.water.from;
    delete plant.water.to;
    ["height", "spread"].forEach(function(field) {
        if (!plant[field]) {
            return;
        }
        var src = plant[field].sanMarcos ? "sanMarcos" : "missouriBotanical";
        var value = plant[field][src];
        if (!value) {
            return;
        }
        keep += 1;
        plant[field].src = src;
        var range = labels[field][value];
        plant[field].from = range.from;
        plant[field].to = range.to;
        plant[field].avg = (range.from+range.to)/2;
    });
    if (plant.sun) {
        keep += 1;
        var src = plant.sun.sanMarcos ? "sanMarcos" : "missouriBotanical";
        plant.sun.src = src;
        plant.sun.range = labels.sun[plant.sun[src]];
    }
    if (plant.photos) {
        ["missouriBotanical", "flickr"].forEach(function(src) {
            if (!plant.photos[src]) {
                return;
            }
            if (plant.photos[src].length === 0) {
                delete plant.photos[src];
            }
        });
    }
    plant.fullInfo = (keep === 3);
});

console.log(JSON.stringify({"plants": plants}, null, 2));
