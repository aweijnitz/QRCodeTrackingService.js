var qr = require('qr-image');

var isDefined = require('../lib/utils').isStrDefined;

var handleReq = function (appConf, log4js) {
    var logger = log4js.getLogger("registerUserRoute");

    var addUserDB = require('../lib/addUserDB')(appConf, log4js);

    // Add user to database and return a QR code with an activation URL
    return function addUser(req, res) {
        var name = req.params.name;
        if (isDefined(name)) {
            addUserDB(req.app.locals.db, name,
                function addUserCallback(err, activationCode) {
                    if (err)
                        res.status(500).json({error: 'Could not add user!', cause: err});
                    else {
                        logger.info('Registered ' + name + ". Code:  " + activationCode);
                        var url = appConf.app.baseUrl + '/activations/' + activationCode;
                        var qr_svg = qr.image(url, {type: 'svg'});

                        res.type('svg');
                        qr_svg.pipe(res);
                    }
                });
        } else {
            res.status(400).json({error: 'Name not specified'})
        }

    };
};

module.exports = handleReq;
