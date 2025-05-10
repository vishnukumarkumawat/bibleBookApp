const mongoose = require('mongoose');

// Define user schema

const userSchema = new mongoose.Schema (
{

    name: {

      type: String,

      required: true,

    },

    email: {

      type: String,

      required: true,

      unique: true,

    },

    password: {

      type: String,

      required: true,

    },

  },

  {

    timestamps: true, //for createdAt and updatedAt

  }

);

// Create User model

const User = mongoose.model('User', userSchema);

module.exports = User;