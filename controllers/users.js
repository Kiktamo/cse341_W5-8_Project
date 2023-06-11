const { validationResult } = require('express-validator');
const mongodb = require('../db/connect');
const bcrypt = require('bcrypt');
const mongo = require('mongodb');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const db = mongodb.getDb()
    const users = db.db('worldbuilding').collection('users');
    const { email, password } = req.body;

    const userExists = await users.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await users.insertOne({ email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const db = mongodb.getDb()
    const users = db.db('worldbuilding').collection('users');
    const { email, password } = req.body;

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    req.login(user, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json({ message: 'User logged in successfully' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const db = mongodb.getDb()
    const users = db.db('worldbuilding').collection('users');
    const { oldPassword, newPassword } = req.body;
    const userId = new mongo.ObjectId(req.user._id);

    const user = await users.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: 'User not found' + userId });
    }

    if (user.password) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid old password' });
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await users.updateOne({ _id: userId }, { $set: { password: hashedPassword } });
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = {
  register,
  login,
  changePassword,
};
