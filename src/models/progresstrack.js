const mongoose = require('mongoose');

const progressTrackSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    verse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Verse',
      required: true,
    },
    is_mark_read: {
      type: Number, 
      default: 0,   
      enum: [0, 1],
    }
  },
  {
    timestamps: true, 
  }
);

const ProgressTrack = mongoose.model('ProgressTrack', progressTrackSchema);

module.exports = ProgressTrack;
