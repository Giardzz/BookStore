const joiObjectid = require("joi-objectid")

const Joi = require('joi');

module.exports = function(){
    Joi.objectid = require('joi-objectid')(Joi);
}