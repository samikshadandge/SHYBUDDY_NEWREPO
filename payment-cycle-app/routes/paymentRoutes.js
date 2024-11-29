const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/weekly-sheets', async (req, res) => {
  const today = new Date();
  const lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
  const lastMonday = new Date(lastSunday.setDate(lastSunday.getDate() - 6));

  try {
    const orders = await Order.find({
      shippingDate: { $gte: lastMonday, $lte: lastSunday },
      status: 'Delivered',
    });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weekly sheets' });
  }
});

router.get('/early-sheets', async (req, res) => {
  const today = new Date();
  const last2Days = new Date(today.setDate(today.getDate() - 2));

  try {
    const orders = await Order.find({
      shippingDate: { $gte: last2Days, $lte: new Date() },
      status: 'Delivered',
    });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch early sheets' });
  }
});

module.exports = router;
