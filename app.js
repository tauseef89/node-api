const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

const books = require('./routes/books');

// connect to mongodb 
const dbURI = "mongodb+srv://demo1:demo_123456@books.c8fjo.mongodb.net/Books";

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(result => console.log('Mongodb connected'))
  .catch(err => console.log(err));

// Middlewares
app.use(express.json());
app.use(cors());
// routes
app.get('/', (req, res) => {
    res.send('home page');
});
app.use('/api/books', books);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));