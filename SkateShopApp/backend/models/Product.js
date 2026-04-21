const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  description: { type: String },
  featured: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', ProductSchema);