const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true, // Ensures the key is unique in the database
  },
  state: {
    type: String,
    enum: ['available', 'reserved', 'sold'], // Only two states: available or sold
    default: 'available',
  },
  reservedUntil: { type: Date, default: null },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
});

const Key = mongoose.models.Key || mongoose.model('Key', keySchema);

module.exports = Key;
