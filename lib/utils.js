module.exports = {
    isStrDefined: function isStrDefined(str) {
        return (typeof str != 'undefined' && null != str && '' != str);
    }
};
