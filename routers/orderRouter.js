import express from 'express';
import Order from '../models/order.js';
import Product from '../models/product.js';

const ordersRouter = express.Router();

ordersRouter.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).send('User ID not provided');
    }

    const userOrders = await Product.find({ user: userId });

    console.log('Orders found:', userOrders);
    res.json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

export default ordersRouter;
