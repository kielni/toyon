var jf = require("jsonfile"),
    async = require("async");

if (process.argv.length < 3) {
    console.log("usage: node flickr_photo_size.js <plantdb.json>");
    process.exit(1);
}
var plantdb = jf.readFileSync(process.argv[2], "utf-8");
var Flickr = require("flickrapi");

var plants = plantdb.plants;

var flickrOptions = {
    api_key: process.env.FLICKR_API_KEY,
    secret: process.env.FLICKR_API_SECRET,
    permissions: "read"
};

// get all the flickr photo ids
var photos = {};
plants.forEach(function(plant) {
    if (!plant.flickr) {
        return;
    }
    Object.keys(plant.flickr).forEach(function(photoId) {
        photos[photoId] = {};
    });
});
console.log(Object.keys(photos).length+" photos");

var updatePlants = function() {
    plants.forEach(function(plant) {
        if (!plant.flickr) {
            return;
        }
        var urls = [];
        Object.keys(plant.flickr).forEach(function(photoId) {
            if (photos[photoId]) {
                urls.push(photos[photoId].url);
                plant.flickr[photoId].width = photos[photoId].width;
                plant.flickr[photoId].height = photos[photoId].height;
            }
        });
        plant.photos.flickr = urls;
    });
};

var getSizes = function(flickr, photoId, callback) {
    flickr.photos.getSizes({
        photo_id: photoId
    }, function(err, result) {
        // get the biggest size up to 1600px
        var max = 0;
        if (!result || !result.sizes) {
            callback();
            return;
        }
        result.sizes.size.forEach(function(size) {
            var w = parseInt(size.width);
            var h = parseInt(size.height);
            if (w > 1600 || h > 1600) {
                return;
            }
            if (w > max) {
                photos[photoId] = {
                    url: size.source,
                    width: w,
                    height: h
                };
            }
        });
        console.log("\t"+"width="+photos[photoId].width+" height="+photos[photoId].height);
        callback();
    });
};

var i = 0;
var total = Object.keys(photos).length;
Flickr.authenticate(flickrOptions, function(error, flickr) {
    async.forEachSeries(Object.keys(photos), function(photoId, forEachCallback) {
        console.log((++i)+"/"+total+"\t"+photoId);
        getSizes(flickr, photoId, function() {
            forEachCallback();
        });
    }, function(err) {
        updatePlants();
        console.log("\n\njson=");
        console.log(JSON.stringify({"plants": plants}, null, 2));
        process.exit(0);
    });
});
