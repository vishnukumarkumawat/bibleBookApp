const mongoose = require('mongoose');

const connectDB = async () => {

  try {

    const dbURI = process.env.MONGO_URI;

    await mongoose.connect(dbURI, {});

    console.log('MongoDB connected');
 
  } catch (error) {

    console.error('MongoDB connection failed:', error);

    process.exit(1);
  
  } 

}; 

module.exports = connectDB;


