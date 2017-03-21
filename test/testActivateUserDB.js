var should = require('should');
var sqlite3 = require('sqlite3');
var mockLogger = require('./mocks/mockLogger');

var activateUserDB = require('../lib/activateUserDB')({}, mockLogger);
var db = new sqlite3.Database(':memory:');
db.serialize(); // put db in serialized mode, since we need predictability and repeatability

describe('activateUserDB', function () {

    before(function (done) {
        db.exec("CREATE TABLE if not exists signups (name TEXT, date DATETIME, code CHARACTER(32), scanned BOOLEAN);" +
            "DELETE FROM signups where name='anders';INSERT INTO signups VALUES ('anders', date('now'), 'hascodeofanders', 0)",
            function (err) {
                done(err);
            });
    });

    after(function () {
        // Sometimes throws SQLITE_BUSY error, because DB internals. Not relevant for this test.
        // db.close();
    });

    it('Should activate user in database', function (done) {
        activateUserDB(db, 'hascodeofanders', function (err0, ok) {
            should.not.exist(err0);
            db.get("SELECT * FROM signups where code='hascodeofanders'", function(err1, rows){
                should.not.exist(err1);
                rows.scanned.should.equal(1);
                done(err1);
            })
        });
    });

});
