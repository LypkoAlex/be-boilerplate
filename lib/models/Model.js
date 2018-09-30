const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Model  = new Schema({
    name : Object
});

module.exports = mongoose.model('Model', Model);
