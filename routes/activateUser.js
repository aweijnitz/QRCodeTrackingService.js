var isDefined = require('../lib/utils').isStrDefined;

var handleReq = function (appConf, log4js) {
    var logger = log4js.getLogger("activateUserRoute");

    var activateUser = require('../lib/activateUserDB')(appConf, log4js);

    return function addUser(req, res) {
        var code = req.params.code;
        !isDefined(name) ? res.status(400).json({error: 'Code not specified'}) :
            activateUser(req.app.locals.db, code,
                function activateUserCallback(err, code) {
                    if (err)
                        res.status(500).json({error: 'Could not activate code!', cause: err});
                    else
                        res.json({msg: 'Activated ' + code});
                });
    };
};

module.exports = handleReq;
