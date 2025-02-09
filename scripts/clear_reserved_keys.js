require('dotenv').config();
const mongoose = require('mongoose');
const Key = require('../models/keys');
const connectToDB = require('../config/database');



// Function to release expired reservations
const releaseExpiredReservations = async () => {
  try {
    // Connect to the database
    await connectToDB();

    const currentTime = new Date();

    // Update keys where reservation time has expired and state is reserved
    const result = await Key.updateMany(
      { reservedUntil: { $lt: currentTime }, state: "reserved" },
      { 
        $set: { state: "available" }, 
        $unset: { reservedUntil: 1 } 
      }
    );

    console.log(`Released ${result.modifiedCount} expired reservations.`);
  } catch (error) {
    console.error("Error releasing expired reservations:", error);
  } finally {
    mongoose.disconnect(); // Disconnect from DB after operation
  }
};

// Execute the function
releaseExpiredReservations();
