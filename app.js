const express = require('express');
const mongoose = require('mongoose');

const app = express();

// connect to mongodb 
const dbURI = "mongodb+srv://demo1:demo_123456@books.c8fjo.mongodb.net/Books";

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(result => console.log('Mongodb connected'))
  .catch(err => console.log(err));

// routes
app.get('/', (req, res) => {
    res.send('home page');
});

// @desc    Get all books
// @route   GET /api/books
app.get('/api/books', (req, res) => {
    res.send('all books');
});

// @desc    Add book
// @route   POST /api/books
app.post('/api/books', (req, res) => {
    res.send('Add book');
});

// @desc    Delete book
// @route   DELETE /api/books/:id
app.delete('/api/books/:id', (req, res) => {
    res.send('Delete book');
});

// @desc    Single book
// @route   GET /api/books/:id
app.get('/api/books/:id', (req, res) => {
    res.send('Single book');
});
// @desc    Update book
// @route   PUT /api/books/:id
app.put('/api/books/:id', (req, res) => {
    res.send('Update book');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));