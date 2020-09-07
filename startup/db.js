const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    mongoose.connect('mongodb://localhost/bookstore')
    .then(() => winston.info('Connected to MongoDB...'));
}