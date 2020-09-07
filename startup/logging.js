const winston = require('winston');

module.exports = function () {
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtExceptions.log'})
        );

    process.on('unhandledRejection', (ex) => {
        throw ex //handled by winston
    });
    
    winston.add(winston.transports.File, { filename: 'logfile.log'});
}