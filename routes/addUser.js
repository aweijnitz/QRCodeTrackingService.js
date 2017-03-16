var isDefined = require('../lib/utils').isStrDefined;

var handleReq = function (appConf, log4js) {
    var logger = log4js.getLogger("addUserRoute");

    var addUser = require('../lib/addUserDB')(appConf, log4js);

    return function addUser(req, res) {
        var name = req.params.name;
        !isDefined(name) ? res.status(400).json({error: 'Name not specified'}) :
            addUser(req.app.locals.db, name,
                function addUserCallback(err, ok) {
                    if (err)
                        res.status(500).json({error: 'Could not add user!', cause: err});
                    else
                        res.json({msg: 'Saved ' + name});
                });
    };
};

module.exports = handleReq;
