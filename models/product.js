import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  productName: String,
  price: Number,
  color: String,
  size: String,
  src: String,
  user: String,
  link: String,
  country: String,
  date: String,
  composition: [String],
});

const Product = mongoose.model('Product', productSchema);

export default Product;
