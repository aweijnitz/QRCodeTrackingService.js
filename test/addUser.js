var should = require('should');
var util = require('util');
var sqlite3 = require('sqlite3');
var mockLogger = require('./mocks/mockLogger');

var addUser = require('../lib/addUserDB')({}, mockLogger);
var db = new sqlite3.Database(':memory:');
db.serialize(); // put db in serialized mode, since we need predictability and repeatability

describe('addUser', function () {

    before(function (done) {
        db.exec("CREATE TABLE if not exists signups (name TEXT, date DATETIME, code CHARACTER(32), scanned BOOLEAN)",
        function(err) {
            done(err);
        });
    });

    after(function () {
       // Sometimes throws SQLITE_BUSY error, because DB internals. Not relevant for this test.
        // db.close();
    });

    it('Should add new user to database', function (done) {
        addUser(db, 'anders', function (err, ok) {
            should.not.exist(err);
            done(err);
        });
    });

    it('Should break on existing user', function (done) {
        addUser(db, 'anders', function (err, ok) {
            addUser(db, 'anders', function (err, ok) {
                should.exist(err);
                done();
            });
        });
    });

});
