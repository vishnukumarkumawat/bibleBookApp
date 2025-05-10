const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { register, login } = require('../controllers/authController');
const { registerValidationSchema, loginValidationSchema } = require('../validators/authValidator');

router.post('/register',validate(registerValidationSchema), register);
router.post('/login',validate(loginValidationSchema), login);

module.exports = router;