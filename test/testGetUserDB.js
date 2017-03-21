var should = require('should');

var util = require('util');
var moment = require('moment');
var sqlite3 = require('sqlite3');
var mockLogger = require('./mocks/mockLogger');

var getUser = require('../lib/getUserDB')({}, mockLogger);
//var db = new sqlite3.Database('./test/dbfiles/getuser.db');
var db = new sqlite3.Database(':memory:');
db.serialize(); // put db in serialized mode, since we need predictability and repeatability

describe('getUser', function () {

    before(function (done) {
        db.run("CREATE TABLE if not exists signups (name TEXT, date DATETIME, code CHARACTER(32), scanned BOOLEAN)");
        db.exec(
            "INSERT INTO signups VALUES ('anders', date('now'), 'hascodeofanders', 0);"+
            "INSERT INTO signups VALUES ('erik', date('now'), 'hascodeoflars', 0)",
            function (err) {
                done(err);
            });
    });

    after(function () {
        db.exec("DROP TABLE signups");
        //db.close();
    });

    it('Should get named user from database', function (done) {
        getUser(db, 'anders', function (err, ok) {
            should.not.exist(err, 'Error invoking db');
            should.exist(ok);
            ok.should.have.length(1);
            done(err);
        });
    });

    it('Should get all users from database', function (done) {
        getUser(db, null, function (err, ok) {
            should.not.exist(err, 'Error invoking db');
            should.exist(ok);
            ok.should.have.length(2);
            done(err);
        });
    });

});
