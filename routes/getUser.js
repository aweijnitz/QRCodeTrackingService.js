var isStrDefined = require('../lib/utils').isStrDefined;


var handleReq = function (appConf, log4js) {
    var logger = log4js.getLogger("getUserRoute");

    var getUserDB = require('../lib/getUserDB')(appConf, log4js);

    return function getUser(req, res) {
        var name = req.params.name;
        if (!isStrDefined(name))
            name = null;

        getUserDB(req.app.locals.db, name,
            function getUserCallback(err, result) {
            logger.debug(result);
                if (err)
                    res.status(500).json({error: 'Could not get user!', cause: err});
                else
                    res.json({ users: result });
            });
    };
};

module.exports = handleReq;
