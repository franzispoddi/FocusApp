const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import your Sequelize User model
const { User } = require('../models/User'); // Adjust path as needed

const authRouter = express.Router();

// Function for validating user credentials against the database
const isValidUser = async (username, password) => {
  try {
    // Attempt to find a user with the provided username
    const user = await User.findOne({ where: { username } });
    if (user && user.password === password) { // Assuming plain text comparison for demonstration; use hashed passwords in production
      return user;
    }
    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await isValidUser(username, password);
    if (user) {
      // Sign a JWT with the user's ID
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Error during authentication');
  }
});

module.exports = authRouter;