//var os = require('os');
//var util = require('util');

/**
 * Private helper to sanity check a string before using it.
 * @param str
 * @returns {boolean}
 */
var isDefined = function (str) {
    return (typeof str != 'undefined' && null != str && '' != str);
}


var handleReq = function (appConf, log4js) {
    var logger = log4js.getLogger("addUserRoute");

    var addUser = require('../lib/addUser')(appConf, log4js);

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
