const mongoose = require('mongoose');

// Define user schema

const bookSchema = new mongoose.Schema (
{

    name: {

      type: String,

      required: true,

      unique: true,

    },
  },

  {

    timestamps: true, //for createdAt and updatedAt

  }

);

// Create Book model

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;