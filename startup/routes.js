const error = require('../middleware/error');
const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const books = require('../routes/books');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function(app ) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/books', books);
    app.use('/api/users', users);
    app.use('api/auth', auth);
    app.use(error);
}