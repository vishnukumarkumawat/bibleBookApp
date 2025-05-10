const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { getBookList, getVersionList, getVersesList, markVerseAsRead } = require('../controllers/bibleController');
const verifyToken = require("../middlewares/verifyToken");
const { getVersionListValidation, getVersesListValidation,progressTrackValidation } = require('../validators/bibleValidation');

router.get('/getBookList', verifyToken, getBookList);
router.post('/getVersionList', verifyToken, validate(getVersionListValidation), getVersionList);
router.post('/getVersesList', verifyToken, validate(getVersesListValidation), getVersesList);
router.post('/markVerseAsRead', verifyToken, validate(progressTrackValidation), markVerseAsRead );


module.exports = router;