const {Sell, validate} = require('../models/sell');
const {Book} = require('../models/book');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const { Customer } = require('../models/customer');
const router = express.Router();
const auth = require('../middleware/auth');

Fawn.init(mongoose);

router.get('/', auth, async(req, res) => {
    const sells = await Sell.find().sort('-date');
    res.send(sells);
});

router.post('/', auth, async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer...');

    const book = await Book.findById(req.body.bookId);
    if(!book) return res.status(400).send('Invalid book...');

    if(book.numberInStock === 0) return res.status(400).send('Book not in stock at the moment...');

    let sell = new Sell({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        book: {
            _id: book._id,
            title: book.title,
            dailySellRate: book.dailySellRate
        }
    });

    try {
        new Fawn.Task()
            .save('sells', sell)
            .update('books', {_id:book._id}, {
                $inc: {numberInStock: -1}
            })
            .run();

        res.send(sell);
    }
    catch(exception) {
        res.status(500).send('something failed.');
    }

});