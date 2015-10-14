/*
    get Flickr usernames by id for use in CC attributions
*/
var async = require("async");
var Flickr = require("flickrapi");
var flickrOptions = {
        api_key: process.env.FLICKR_API_KEY,
        secret: process.env.FLICKR_API_SECRET,
        permissions: "read"
};
var owners = {};
var photos = {};

var getUsername = function(flickr, ownerId, callback) {
    if (owners[ownerId]) {
        console.log("\thad owner "+ownerId+" = "+owners[ownerId]);
        callback(null, owners[ownerId]);
        return;
    }
    flickr.people.getInfo({user_id: ownerId}, function(err, result) {
        owners[ownerId] = result.person.username._content;
        console.log("\tlookup owner "+ownerId+" = "+owners[ownerId]);
        callback(null, owners[ownerId]);
    });
};

var getFavoritesPage = function(flickr, page, callback) {
    flickr.favorites.getPublicList({
        user_id: process.env.FLICKR_USER_ID,
        page: page
    }, function(err, result) {
        async.forEachSeries(result.photos.photo, function(photo, forEachCallback) {
            if (!photos[photo.id]) {
                photos[photo.id] = {
                    owner: photo.owner
                };
            }
            console.log("photo.id="+photo.id);
            getUsername(flickr, photo.owner, function(err, result) {
                photos[photo.id].username = result;
                forEachCallback();
            });
        }, function(err) {
            // got all usernames for this page
            callback(null, result.photos.page, result.photos.pages);
        });
    });
};

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    getFavoritesPage(flickr, 1, function(err, page, totalPages) {
        console.log("got favorites page 1/"+totalPages);
        var pageNum = 2;
        async.timesSeries(totalPages-1, function(n, next) {
            console.log("\n\n*** get page "+(n+1));
            getFavoritesPage(flickr, pageNum++, next);
        }, function(err) {
            console.log("json=");
            console.log(JSON.stringify({"flickrPhotos": photos}));
            system.exit(0);
        });
    });
});
