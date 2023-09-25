import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'users',
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model('orders', orderSchema);

export default Order;
