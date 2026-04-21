const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Middleware to verify JWT (simplified for this example)
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });
  try {
    const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

router.post('/', auth, async (req, res) => {
  try {
    const { items, total } = req.body;
    const order = new Order({
      userId: req.user.id,
      items,
      total,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;