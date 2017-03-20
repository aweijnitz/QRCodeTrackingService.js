var isDefined = require('../lib/utils').isStrDefined;

var handleReq = function (appConf, log4js) {
    var logger = log4js.getLogger("addUserRoute");

    var addUserDB = require('../lib/addUserDB')(appConf, log4js);

    return function addUser(req, res) {
        var name = req.params.name;
        if (isDefined(name)) {
            addUserDB(req.app.locals.db, name,
                function addUserCallback(err, ok) {
                    if (err)
                        res.status(500).json({error: 'Could not add user!', cause: err});
                    else
                        res.json({msg: 'Saved ' + name});
                });
        } else {
            res.status(400).json({error: 'Name not specified'});
        }

    };
};

module.exports = handleReq;
