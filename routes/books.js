const express = require('express');
const router = express.Router();
const { getBooks, addBook, getBook, editBook, deleteBook } = require('../controllers/books');

router
  .route('/')
  .get(getBooks)
  .post(addBook);

router
  .route('/:id')
  .get(getBook)
  .put(editBook)
  .delete(deleteBook);

module.exports = router;