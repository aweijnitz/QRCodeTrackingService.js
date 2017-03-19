var appConf = require('../conf/appConfig.json');
var express = require('express');
var router = express.Router();
var throttle = require("express-throttle");


var log4js = require('log4js');
log4js.configure('./conf/log4js.json');
var logger = log4js.getLogger("index");
var maxRequestRate = "5/s";

// Load route handlers (doubling as rudimentary MVC controllers)
var qrCodeGenerator = require('./qrCodeGenerator.js')(appConf, log4js);
var addUser = require('./addUser')(appConf, log4js);
var getUser = require('./getUser')(appConf, log4js);
var registerUser = require('./registerUser')(appConf, log4js);
var activateUser = require('./activateUser')(appConf, log4js)

// Remember, in Express 4, '/' is the root under which this route is mounted, so does not
// necessarily correspond to the absolute root of the domain.
//
router.get('/', throttle({ "rate": maxRequestRate }), function(req, res) {
  logger.debug('Serving / --> index.hjs');
  res.render('index', { title: 'QR Code Generator' });
});



// Generate QR code with given content (passed as query param)
//
router.get('/qr', throttle({ "rate": maxRequestRate }), qrCodeGenerator);

// Add user, but don't generate any QR code. Intended for scripted DB fill, etc.
//
router.post('/users/:name', throttle({ "rate": maxRequestRate }), addUser);
router.get('/users/:name', throttle({ "rate": maxRequestRate }), getUser);

// Register user and return QR code containing the activation key
//
router.post('/register/:name', throttle({ "rate": maxRequestRate }), registerUser);

router.get('/activate/:code', throttle({ "rate": maxRequestRate }), activateUser);

module.exports = router;
