const {Book, validate} = require('../models/book'); 
const {Genre} = require('../models/genre');
const auth = require('../middleware/auth');
const express = require('express');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.find().sort('name');
  res.send(books);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  let book = new Book({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailySellRate: req.body.dailySellRate
  });
  book = await book.save();
  
  res.send(book);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const book = await Book.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailySellRate: req.body.dailySellRate
    }, { new: true });

  if (!book) return res.status(404).send('The book with the given ID was not found.');
  
  res.send(book);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);

  if (!book) return res.status(404).send('The book with the given ID was not found.');

  res.send(book);
});

router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).send('The book with the given ID was not found.');

  res.send(book);
});

module.exports = router; 