const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Pro Series Deck - Black',
    category: 'Decks',
    price: 59.99,
    images: ['https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=800&q=80'],
    description: 'High-quality 7-ply Canadian Maple deck.',
    featured: true,
    trending: true
  },
  {
    name: 'Classic Wheels 52mm',
    category: 'Wheels',
    price: 24.99,
    images: ['https://images.unsplash.com/photo-1531565637446-32307b194362?auto=format&fit=crop&w=800&q=80'],
    description: 'Smooth ride for street and park.',
    featured: false,
    trending: true
  },
  {
    name: 'Skate Logo Hoodie',
    category: 'Apparel',
    price: 45.00,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80'],
    description: 'Comfortable oversized hoodie.',
    featured: true,
    trending: false
  },
  {
    name: 'Precision Bearings ABEC-7',
    category: 'Accessories',
    price: 15.00,
    images: ['https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80'],
    description: 'Fast and durable bearings.',
    featured: false,
    trending: false
  }
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skateshop');
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database Seeded');
  mongoose.connection.close();
};

seedDB();