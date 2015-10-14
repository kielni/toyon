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

var pruned = [];
plants.forEach(function(plant) {
    if (!plant.fullInfo) {
        return;
    }
    plant.water = {
        "to": plant.water.to,
        "from": plant.water.from
    };
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
    });
    delete plant.fullInfo;
    if (plant.search) {
        delete plant.search;
    }
    pruned.push(plant);
});
console.log(JSON.stringify({"plants": pruned}, null, 2));
