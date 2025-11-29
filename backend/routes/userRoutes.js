const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');


// GET
router.get('/all', async (req, res, next) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});


//
// POST
router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully.',
      user_id: newUser._id
    });
  } catch (err) {
    next(err);
  }
});


// POST
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Wrong Username or Passoword' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong Username or Passoword' });
    }

    res.status(200).json({
      message: 'Login successful',
      user_id: user._id
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
