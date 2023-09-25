import express from 'express';
import Login from '../models/login.js';

const login = express.Router();

login.get('/', (req, res) => {
  res.send('Login Form Here');
});

login.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(400).send('Invalid login credentialss');
    }
    if (user.password !== password) {
      return res.status(400).send('Invalid login credentials');
    }

    res.send('Logged in successfully!');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default login;
