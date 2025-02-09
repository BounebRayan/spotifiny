const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  type: { required: true, type: String },
  payment_id: { required: true, type: String },
  email: { required: true, type: String },
  orderDate: { default: Date.now, required: true, type: Date },
  keys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Key' }],
  
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

module.exports = Order;
