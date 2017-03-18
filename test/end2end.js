var should = require('should');
var util = require('util');
var request = require('request');
var log4js = require('log4js');


var conf = {
    "app": {
        "webroot": "public",
        "db": {
            "filename": ":memory:"
        },
        "baseUrl": "127.0.0.1"
    },
    "server": {
        "port": 8090
    }
};

var app = require('../app')(conf, log4js);

describe('End to end tests (starts server!)', function () {
    var server = null;

    before(function (done) {
        var server = app.listen(conf.server.port, 'localhost', function () {
            done();
        });
    });

    it('Should respond on the configured port', function (done) {
        request('http://127.0.0.1:' + conf.server.port, function (err, response, body) {
            (!!err).should.be.false;
            (!!body).should.be.true;
            response.statusCode.should.be.greaterThan(199);
            done(err);
        });
    });


});
