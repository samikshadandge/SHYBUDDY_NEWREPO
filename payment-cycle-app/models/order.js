const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true },
  orderRate: { type: Number },
  CODcharges: { type: Number },
  usersId: { type: String, required: true },
  status: { type: String, enum: ['Delivered', 'Pending'], required: true },
  shippingDate: { type: Date, required: true },
  pickupTime: { type: Date },
  deadWeight: { type: mongoose.Types.Decimal128 },
  length: { type: mongoose.Types.Decimal128 },
  breadth: { type: mongoose.Types.Decimal128 },
  height: { type: mongoose.Types.Decimal128 },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
