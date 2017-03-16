var qr = require('qr-image');

var isStrDefined = require('../lib/utils').isStrDefined;

var handleReq = function (appConf, log4js) {
    var logger = log4js.getLogger("registerUserRoute");

    var addUser = require('../lib/addUserDB')(appConf, log4js);

    return function addUser(req, res) {
        var name = req.params.name;
        !isDefined(name) ? res.status(400).json({error: 'Name not specified'}) :
            addUser(req.app.locals.db, name,
                function addUserCallback(err, activationCode) {
                    if (err)
                        res.status(500).json({error: 'Could not add user!', cause: err});
                    else {
                        logger.info('Registered ' + name + ". Code:  " + activationCode);
                        var url = 'http://' + appConf.app.baseUrl + '/activations/'+activationCode;
                        var qr_svg = qr.image(url, { type: 'svg' });

                        res.type('svg');
                        qr_svg.pipe(res);
                    }
                });
    };
};

module.exports = handleReq;
