var factoryFunction = function factoryFunction(appConf, log4js) {
    var logger = log4js.getLogger("getUser");

    return function getUsers(db, name, cb) {

        var dbcallback = function dbcallback(err, rows) {

            if (err)
                cb(err, null);
            else {
                cb(null, rows);
            }
        };

        !name ? db.all("SELECT * from signups", dbcallback) :
            db.all("SELECT * from signups where name='" + name + "'", dbcallback);
    };
};

module.exports = factoryFunction;
