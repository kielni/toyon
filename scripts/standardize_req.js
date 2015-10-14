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
*/
var plantdb = jf.readFileSync(process.argv[2], "utf-8");
var plants = plantdb.plants;

/*
    "sun": { "Sun or Shade": ["sun", "part", "sun"], ...}
    "height": { "4-5 feet": { "from": 4, "to": 5}, ...}
    "spread": { "0.75 to 1.00 feet": { "from": 0.75, "to": 1}, ...}
*/
var labels = jf.readFileSync(process.argv[3], "utf-8");


plants.forEach(function(plant) {
    var keep = 0;
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
    plant.fullInfo = (keep === 3);
});

console.log("json=");
console.log(JSON.stringify({"plants": plants}, null, 2));
