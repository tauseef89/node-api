const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();

// connect to mongodb 
const dbURI = "mongodb+srv://demo1:demo_123456@books.c8fjo.mongodb.net/Books";

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(result => console.log('Mongodb connected'))
  .catch(err => console.log(err));

// Middlewares
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('home page');
});

// @desc    Get all books
// @route   GET /api/books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
    
        return res.status(200).json({
          success: true,
          data: books
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
});

// @desc    Add book
// @route   POST /api/books
app.post('/api/books', async (req, res) => {
    try {
        const { name, price } = req.body;
    
        const book = await Book.create(req.body);
      
        return res.status(201).json({
          success: true,
          data: book
        }); 
      } catch (err) {
        if(err.name === 'ValidationError') {
          const messages = Object.values(err.errors).map(val => val.message);
    
          return res.status(400).json({
            success: false,
            error: messages
          });
        } else {
          return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
        }
    }
});

// @desc    Delete book
// @route   DELETE /api/books/:id
app.delete('/api/books/:id', (req, res) => {
    res.send('Delete book');
});

// @desc    Single book
// @route   GET /api/books/:id
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
    
        return res.status(200).json({
          success: true,
          data: book
        });
    
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
});
// @desc    Update book
// @route   PUT /api/books/:id
app.put('/api/books/:id', (req, res) => {
    res.send('Update book');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));