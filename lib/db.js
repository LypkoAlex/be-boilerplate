const mongoose     = require('mongoose');
const { database } = require('../etc/config.json');

module.exports = {
    connect : () => {
        mongoose.connect(database.path);
    }
};
