var isDefined = require('../lib/utils').isStrDefined;

var handleReq = function (appConf, log4js) {
    var logger = log4js.getLogger("activateUserRoute");

    var activateUserDB = require('../lib/activateUserDB')(appConf, log4js);

    return function addUser(req, res) {
        var code = req.params.code;

        if (isDefined(code)) {
            activateUserDB(req.app.locals.db, code,
                function activateUserCallback(err, ok) {
                    if (err)
                        res.status(500).json({error: 'Could not activate code!', cause: err});
                    else
                        res.json({msg: 'Activated ' + code});
                });
        } else {
            res.status(400).json({error: 'Code not specified'});
        }
    };
};

module.exports = handleReq;
