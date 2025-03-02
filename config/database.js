const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectToDB = async (options) => {
  try {
    await mongoose.connect(MONGO_URI, options);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = connectToDB;