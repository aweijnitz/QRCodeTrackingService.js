var crypto = require('crypto');
var md5sum = crypto.createHash('md5');

var moment = require('moment');

var hashName = function hashName(name) {
    var hash = crypto.createHash('md5').update(name).digest('hex');
    return hash;
};

var factoryFunction = function factoryFunction(appConf, log4js) {
    var logger = log4js.getLogger("addUserDB");

    return function addUser(db, name, cb) {
        var addUserStatement = db.prepare("INSERT INTO signups VALUES (?, ?, ?, ?)"); // TODO: Move to somewhere

        db.get("SELECT * from signups where name='" + name + "'", function (err, row) {
            if (row) {
                cb('User Exists!', null);
            } else {
                var activationCode = hashName(name + 'a pinch of salt');
                addUserStatement.run(name, moment(new Date()).format('YYYY-MM-DD kk:mm:ss') , activationCode, 0);
                addUserStatement.finalize(function() {
                    if(err)
                        cb(err, null);
                    else
                        cb(null, activationCode);
                });
            }
        });


    };
};

module.exports = factoryFunction;
