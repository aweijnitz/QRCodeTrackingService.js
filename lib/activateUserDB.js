var factoryFunction = function factoryFunction(appConf, log4js) {
    var logger = log4js.getLogger("activateUserDB");

    return function activateUserDB(db, code, cb) {
        db.run("UPDATE signups SET scanned = 1 WHERE code = '"+code+"'", cb);
    };
};

module.exports = factoryFunction;
