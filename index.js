import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRouter from './routers/productRouter.js';
import loginRouter from './routers/loginRouter.js';
import ordersRouter from './routers/orderRouter.js';
import getPassRouter from './routers/getPassInfoRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });

app.use('/products', productRouter);
app.use('/login', loginRouter);
app.use('/orders', ordersRouter);
app.use('/getPass', getPassRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
