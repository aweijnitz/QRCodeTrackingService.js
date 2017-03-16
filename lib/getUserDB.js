var factoryFunction = function factoryFunction(appConf, log4js) {
    var logger = log4js.getLogger("getUser");

    return function getUsers(db, name, cb) {
        db.all("SELECT * from signups where name='" + name + "'", function (err, rows) {
            if (err)
                cb(err, null);
            else {
                cb(null, rows);
            }
        });
    };
};

module.exports = factoryFunction;
