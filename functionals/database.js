var MongoClient = require('mongodb').MongoClient;

var libs = {};

exports.connect = function(url, req_libs) {
    MongoClient.connect(url, function(err, db) {
        if (err) return console.log(err);
        for (lib of req_libs) libs[lib] = db.collection(lib);
    });
}

exports.libs = libs;

exports.insert = function(lib, item, callback) {
    libs[lib].insert(item, {w:1}, callback);
}

exports.update = function(lib, key, callback) {
    libs[lib].update(key, {w:1}, callback);
}

exports.find = function(lib, key, callback) {
    libs[lib].find(key).toArray(callback);
}

exports.findSort = function(lib, key, sort, callback) {
    libs[lib].findSort(key).sort(sort).toArray(callback);
}

exports.deleteOne = function(lib, key, callback) {
    libs[lib].deleteOne(key, callback);
}