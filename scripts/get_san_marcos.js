var jf = require("jsonfile");

if (process.argv.length < 4) {
    console.log("usage: node get_san_marcos.js <sourcedb.json> <plantdb.json>");
    process.exit(1);
}

/*
    get search.sanMarcos from plantdb
    add to plantdb
*/
var sourcedb = jf.readFileSync(process.argv[2], "utf-8");
var search = {};
sourcedb.plants.forEach(function(plant) {
    if (plant.search && plant.search.sanMarcos && plant.search.sanMarcos.matches.length > 0) {
        search[plant.id] = plant.search.sanMarcos;
    }
});

var plantdb = jf.readFileSync(process.argv[3], "utf-8");
var plants = plantdb.plants;
plants.forEach(function(plant) {
    if (search[plant.id]) {
        if (!plant.search) {
            plant.search = {};
        }
        plant.search.sanMarcos = search[plant.id];
    }
});
console.log(JSON.stringify({"plants": plants}, null, 2));
