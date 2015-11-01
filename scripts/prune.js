var jf = require("jsonfile");

if (process.argv.length < 3) {
    console.log("usage: node standard_req.js <plantdb.json>");
    process.exit(1);
}

/*
    keep only plants with full info
    remove redundant info
*/
var plantdb = jf.readFileSync(process.argv[2], "utf-8");
var plants = plantdb.plants;

// height buckets: 1, 3, 10
var heightBuckets = [1, 3, 10, 999];
var heightLabels = {1: 'low', 3: 'small', 10: 'medium', 999: 'large'};

var pruned = [];
plants.forEach(function(plant) {
    if (!plant.fullInfo) {
        return;
    }
    plant.water = { 'range': plant.water.range };
    ["missouriBotanical", "sanMarcos"].forEach(function(src) {
        ["height", "spread", "sun"].forEach(function(field) {
            if (plant[field]) {
                if (plant[field][src]) {
                    delete plant[field][src];
                }
                if (plant[field].src) {
                    delete plant[field].src;
                }
            }
        });
        heightBuckets.forEach(function(hMax) {
            if (!plant.height.bucket && plant.height.avg < hMax) {
                plant.height.bucket = heightLabels[hMax];
            }
        });
    });
    delete plant.fullInfo;
    if (plant.search) {
        delete plant.search;
    }
    pruned.push(plant);
});
console.log(JSON.stringify({"plants": pruned}, null, 2));
