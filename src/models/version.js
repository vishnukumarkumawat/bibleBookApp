const mongoose = require('mongoose');

// for version schema
const versionSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // createdAt and updatedAt
  }
);

// Create Version model
const Version = mongoose.model('Version', versionSchema);

module.exports = Version;
