//var appConf = require('../conf/appConfig.json');
//var os = require('os');
//var util = require('util');
//var fs = require('fs');
var qr = require('qr-image');


/**
 * Private helper to sanity check a string before using it.
 * @param str
 * @returns {boolean}
 */
var isDefined = function (str) {
    return (typeof str != 'undefined' && null != str && '' != str);
}


/**
 * Public. Generate QR Code with given content and stream back to client.
 * @param req
 * @param res
 */
var handleReq = function(appConf, log4js) {
    var logger = log4js.getLogger("qrCodeGenerator");

    return function generateQRCode (req, res) {
        var url = 'http://' + (req.query.url || 'no-url-defined');
        var qr_svg = qr.image(url, { type: 'svg' });

        res.type('svg');
        qr_svg.pipe(res);
    };
};

module.exports = handleReq;
