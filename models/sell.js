const Joi = require('joi');
const mongoose = require('mongoose');

const Sell = mongoose.model('Sell', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    book: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailySellRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
}));


function validateSell(sell) {
    const schema = {
        customerId: Joi.objectId().required(),
        bookId: Joi.string().required()
    };

    return Joi.validate(sell, schema);
}

exports.Sell = Sell;
exports.validate = validateSell;