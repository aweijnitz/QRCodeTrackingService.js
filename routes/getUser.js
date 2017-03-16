var isStrDefined = require('../lib/utils').isStrDefined;


var handleReq = function (appConf, log4js) {
    var logger = log4js.getLogger("addUserRoute");

    var getUserDB = require('../lib/getUserDB')(appConf, log4js);

    return function addUser(req, res) {
        var name = req.params.name;
        if (!isStrDefined(name))
            name = '*';

        getUserDB(req.app.locals.db, name,
            function addUserCallback(err, result) {
                if (err)
                    res.status(500).json({error: 'Could not get user!', cause: err});
                else
                    res.json({ users: result });
            });
    };
};

module.exports = handleReq;
