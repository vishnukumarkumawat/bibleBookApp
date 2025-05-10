const Book = require('../models/book');
const Version = require('../models/version');
const Verse = require('../models/verse');
const ProgressTrack = require('../models/progresstrack');
const User = require('../models/user');

//to get the books list
exports.getBookList = async (req, res) => {
  try{
   const books = await Book.find().select('name , id');
    res.status(200).json({
      success: true,
      message: "Books List",
      data: books
    });
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server error' });
   }
};


//to get the version list
exports.getVersionList = async (req, res) => {
  try{

     const { book_id } = req.body;

    // Check if book_id exists in the Book collection
    const bookExists = await Book.findById(book_id);
    if (!bookExists) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    const versions = await Version.find({ book_id }).select('name , id, book_id');

    res.status(200).json({ success: true, data: versions });

   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server error' });
   }
};

//to get the verse list
exports.getVersesList = async (req, res) => {
  try {

    const { book_id, version_id } = req.body;

    const bookExists = await Book.findById(book_id);
    if (!bookExists) {
      return res.status(404).json({ success: false, message: 'Invalid book_id' });
    }

    const versionExists = await Version.findOne({ _id: version_id, book_id });
    if (!versionExists) {
      return res.status(404).json({ success: false, message: 'Invalid version_id for this book' });
    }

    const verses = await Verse.find({ book_id, version_id }).select('_id title content');

    return res.status(200).json({ success: true, data: verses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

//to mark as read or process traking
exports.markVerseAsRead = async (req, res) => {
  try {

    const { verse_id, is_mark_read } = req.body;
    const user_id = req.user.user_id;

    console.log("user_iduser_id",user_id);

    // Check if the verse_id exists
    const verse = await Verse.findById(verse_id);
    if (!verse) {
      return res.status(404).json({
        success: false,
        message: 'Verse not found',
      });
    }

    // Check if the user_id
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if a ProgressTrack exists for this user and verse
    let progressTrack = await ProgressTrack.findOne({ user_id, verse_id });

    if (progressTrack) {
      // Update the existing ProgressTrack
      progressTrack.is_mark_read = is_mark_read;
      await progressTrack.save();
      return res.status(200).json({
        success: true,
        message: 'Progress updated successfully',
      });
    } else {
      // Create a new ProgressTrack entry
      progressTrack = new ProgressTrack({
        user_id,
        verse_id,
        is_mark_read,
      });
      await progressTrack.save();
      return res.status(201).json({
        success: true,
        message: 'Progress marked successfully',
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};