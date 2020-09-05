const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add title']
  },
  price: {
    type: String,
    required: [true, 'Please add price']
  }
});

module.exports = mongoose.model('Book', BookSchema);