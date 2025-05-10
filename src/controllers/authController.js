const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//to create the registration of user
exports.register = async (req, res) => {
   try {

     const { name , email, password } = req.body;
  
     const userExists = await User.findOne({ email });
     if (userExists) return res.status(409).json({ message: 'User already exists' });
  
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = new User({
       name,
       email,
       password: hashedPassword,
     });
  
     await user.save();
     res.status(201).json({ status: true , message: 'User registered successfully' });
  
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server error' });
   }
};


//to login
exports.login = async (req, res) => {
   try {

     const { email, password } = req.body;

    // Check if email exist
     const userExists = await User.findOne({ email });
      if (!userExists) {
      return res.status(404).json({
        status : false,
        message: 'User not found',
      });
    }
    // Check if password matches
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid email or password',
      });
    }

    // Create JWT token
    const token = jwt.sign({ user_id: userExists._id, email: userExists.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return res.status(200).json({
      status: 200,
      message: 'Login successful',
      data: {
        token,
        user: {
          user_id: userExists._id,
          email: userExists.email
        }
      }
    });
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'Server error' });
   }
};