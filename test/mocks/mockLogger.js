module.exports = {
    getLogger: function (loggerName) {
        return {
            info: function (str) {
                console.log(str);
            },
            debug: function (str) {
                console.log(str);
            },
            warn: function (str) {
                console.log(str);
            }
        };
    }

};

