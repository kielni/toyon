var jf = require("jsonfile"),
    async = require("async");

/*
    keep only photos in favorites list
*/
if (process.argv.length < 4) {
    console.log("usage: node scrape_flickr.js <plantdb.json> <flickr photos.json>");
    process.exit(1);
}

var plantdb = jf.readFileSync(process.argv[2], "utf-8");
var plants = plantdb.plants;

var flickrPhotos = jf.readFileSync(process.argv[3], "utf-8").flickrPhotos;
console.log(Object.keys(flickrPhotos).length+" photos in favorites");

/*
"flickr": [ "https://farm9.staticflickr.com/8566/15342403823_97eece38ab_z.jpg"],
"flickrTitles": { "15342403823": "Abies pinsapo - Spanish Fir"}
*/
plants.forEach(function(plant) {
    console.log(plant.name.botanical);
    if (!plant.photos || !plant.photos.flickr) {
        return;
    }
    var titles = plant.photos.flickrTitles || {};
    if (!plant.flickr) {
        plant.flickr = {};
    }
    var keepIds = [];
    // move titles to flickr[id].title
    Object.keys(titles).forEach(function(id) {
        var user = flickrPhotos[id+""];
        console.log("\tid="+id+" user="+JSON.stringify(user));
        if (!user) {
            return;
        }
        keepIds.push(id);
        plant.flickr[id] = {
            title: titles[id],
            owner: user.owner
        };
        if (user.username) {
            plant.flickr[id].username = user.username;
        }
    });
    // remove photos not in list
    var expr = keepIds.join("|");
    console.log("keep expr="+expr);
    plant.photos.flickr = plant.photos.flickr.filter(function(photo) {
        if (photo.match(expr)) {
            console.log("keep "+photo);
            return true;
        } else {
            console.log("removing "+photo);
            return false;
        }
    });
    delete plant.photos.flickrTitles;
});
console.log("json=");
console.log(JSON.stringify({"plants": plants}, null, 2));
