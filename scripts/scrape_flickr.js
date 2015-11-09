var jf = require("jsonfile"),
    async = require("async");

if (process.argv.length < 3) {
    console.log("usage: node scrape_flickr.js <plantdb.json>");
    process.exit(1);
}
var plantdb = jf.readFileSync(process.argv[2], "utf-8");
var Flickr = require("flickrapi");

var plants = plantdb.plants;

var flickrOptions = {
        api_key: process.env.FLICKR_API_KEY,
        secret: process.env.FLICKR_API_SECRET,
        permissions: "write"
};

var getPhotos = function(flickr, plant, callback) {
    flickr.photos.search({
        page: 1,
        per_page: 10,
        license: 2,
        text: plant.name.search
    }, function(err, result) {
        console.log("\t"+result.photos.total+" photos");
        if (!plant.photos) {
            plant.photos = {};
        }
        plant.photos.flickr = [];
        plant.photos.flickrTitles = {};
        var photos = result.photos.photo || [];
        photos.forEach(function(photo) {
            var url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_b.jpg";
            plant.photos.flickr.push(url);
            plant.photos.flickrTitles[photo.id] = photo.title;
            flickr.favorites.add({photo_id: photo.id}, function(err, result) {});
        });
        callback(err, plant);
    });
};

Flickr.authenticate(flickrOptions, function(error, flickr) {
    async.forEachSeries(plants, function(plant, forEachCallback) {
        console.log(plant.name.search);
        getPhotos(flickr, plant, function(err, plant) {
            forEachCallback();
        });
    }, function(err) {
        console.log(JSON.stringify({"plants": plants}, null, 2));
        process.exit(0);
    });
});
