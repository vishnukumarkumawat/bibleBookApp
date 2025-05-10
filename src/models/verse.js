const mongoose = require('mongoose');

const verseSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    version_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Version',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true //createdAt and updatedAt
  }
);

const Verse = mongoose.model('Verse', verseSchema);

module.exports = Verse;