const winston = require('winston');
const express = require('express');
const app = express();

//exception handling + logging
require('./startup/logging')();
//routes init
require('./startup/routes')(app);
//Db init
require('./startup/db')();
//config jwt
require('./startup/config')();
//Joi objectId
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;