// getBooks, addBook, getBook, editBook, deleteBook

const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
exports.getBooks = async (req, res) => {
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
}

// @desc    Add book
// @route   POST /api/books
exports.addBook = async (req, res) => {
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
}

// @desc    Delete book
// @route   DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if(!book) {
      return res.status(404).json({
        success: false,
        error: 'No book found'
      });
    }

    await book.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Single book
// @route   GET /api/books/:id
exports.getBook = async (req, res) => {
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
}

// @desc    Update book
// @route   PUT /api/books/:id
exports.editBook = async (req, res) => {
  try {

    const book = {
      name: req.body.name,
      price: req.body.price
    };

    await Book.findByIdAndUpdate({ _id: req.params.id }, book, { useFindAndModify: false })
  
    return res.status(201).json({
      success: true,
      data: book
    }); 
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}
