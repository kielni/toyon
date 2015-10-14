var jf = require("jsonfile"),
    _ = require("lodash");

if (process.argv.length < 3) {
    console.log("usage: node get_labels.js <plantdb.json>");
    process.exit(1);
}

// get unique values for water, sun, height, and spread
var plantdb = jf.readFileSync(process.argv[2], "utf-8");

var sources = ["missouriBotanical", "sanMarcos"];
var values = {"sun": {}, "height": {}, "spread": {}};

Object.keys(values).forEach(function(field) {
    values[field] = {};
    sources.forEach(function(source) {
        values[field][source] = [];
    });
});

plantdb.plants.forEach(function(plant) {
    Object.keys(values).forEach(function(field) {
        if (!plant[field]) {
            return;
        }
        sources.forEach(function(source) {
            var value = plant[field][source];
            if (!value) {
                return;
            }
            if (!_.contains(values[field][source], value)) {
                values[field][source].push(value);
            }
        });
    });
});

var out = {"sun": {}, "height": {}, "spread":{}};
// sun: map key to TBD value
sources.forEach(function(source) {
    var options = values.sun[source] || [];
    options.forEach(function(val) {
        out.sun[val] = ["?"];
    });
});

// height and spread: parse into min/max if possible
// missouriBotantical: mostly like 1.00 to 2.00 feet
// sanMarcos: mostly like 1-2 feet
var patterns = {
    "sanMarcos": "(\\d+)-(\\d+) feet",
    "missouriBotanical": "([\\d.]+) to ([\\d.]+) feet"
};

["height", "spread"].forEach(function(field) {
    ["sanMarcos", "missouriBotanical"].forEach(function(src) {
        values[field][src].forEach(function(s) {
            var match = s.match(patterns[src]);
            if (match) {
                out[field][s] = {"from": parseFloat(match[1]), "to": parseFloat(match[2])};
            } else {
                out[field][s] = {"from": "?", "to": "?"};
            }
        });
    });
});

console.log(JSON.stringify(out, null, 2));

