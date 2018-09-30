const Files = require('./Files.js');

module.exports = function init() {
    return {
        files : new Files()
    };
};
