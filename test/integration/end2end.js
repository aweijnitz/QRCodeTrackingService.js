var should = require('should');
var shouldHttp = require('should-http');

var util = require('util');
var moment = require('moment');
var request = require('request');
var log4js = require('log4js');
var fs = require('fs');

//log4js.setGlobalLogLevel("ERROR");


var conf = {
    "app": {
        "webroot": "public",
        "db": {
            "filename": "./test/dbfiles/e2e.db"
        },
        "baseUrl": "127.0.0.1"
    },
    "server": {
        "port": 8092
    }
};


var app = require('../../app')(conf, log4js);

describe('End to end tests (starts server!)', function () {
    var server = null;

    before(function (done) {
        var server = app.listen(conf.server.port, 'localhost', function () {
            app.locals.db.serialize(); // Put DB in serialized mode. Need the repeatability for tests
            app.locals.db.exec("DELETE FROM signups where name='anders';INSERT INTO signups VALUES ('anders', date('now'), 'hascodeofanders', 0)",
                function (err) {
                    done(err);
                });
        });
    });

    beforeEach(function (done) {
        app.locals.db.exec("DELETE FROM signups where name='anders';INSERT INTO signups VALUES ('anders', date('now'), 'hascodeofanders', 0)",
            function (err) {
                done(err);
            });
    });

    after(function (done) {
        app.locals.db.exec("DROP TABLE signups", function (err) {
            app.locals.db.close();
            done(err);
        });
    });

    it('Should respond on the configured port', function (done) {
        request('http://127.0.0.1:' + conf.server.port, function (err, response, body) {
            (!!err).should.be.false;
            (!!body).should.be.true;
            response.statusCode.should.equal(200);
            done(err);
        });
    });

    it('Should have GET /users/<name>', function (done) {
        request('http://127.0.0.1:' + conf.server.port + '/users/anders', function (err, response, bodyStr) {
            should.not.exist(err, 'error in invokation. ' + JSON.stringify(err));
            response.statusCode.should.equal(200);
            response.should.be.json();
            should.exist(bodyStr);
            var body = JSON.parse(bodyStr);
            should.exist(body.users, 'users array missing in response');
            body.users.should.have.length(1);

            done(err);
        });
    });


    it('Should have POST /users/<name>', function (done) {
        request.post('http://127.0.0.1:' + conf.server.port + '/users/lars', function (err, response, bodyStr) {
            response.statusCode.should.equal(200);
            response.should.be.json();
            should.exist(bodyStr);
            var body = JSON.parse(bodyStr);
            should.exist(body.msg, 'msg missing in response');

            done(err);
        });
    });


    /*

     it('Should have POST /register', function (done) {
     request.post('http://127.0.0.1:' + conf.server.port + '/register/batman', function (err, response, body) {
     (!!err).should.be.false;
     (!!body).should.be.true;
     response.statusCode.should.equal(200);
     done(err);
     });
     });

     it('Should have POST /activate', function (done) {
     request.post('http://127.0.0.1:' + conf.server.port + '/activate/hascodeofanders', function (err, response, body) {
     (!!err).should.be.false;
     (!!body).should.be.true;
     response.statusCode.should.equal(200);
     done(err);
     });
     });

     */

});
