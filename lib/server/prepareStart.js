var path = require('path');
var Deferred = require("promised-io/promise").Deferred;
var pfs = require('promised-io/fs');


module.exports = function (conf, log4js) {
    var logger = log4js.getLogger("prepare");
    var deferred = new Deferred();
    return function preServerStart() {
        deferred.resolve();
        // do this in the callback of any async operation, like a file read.
        // deferred.reject(); in case of error
        return deferred.promise;
    };
};