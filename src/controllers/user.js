const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { isValidId } = require('../helpers/checker');

const createUser = async (req, res) => {
  const { name, username, password, role } = req.body;
  try {
    const user = await User.create({
      name,
      username,
      password: await bcrypt.hash(password, 10),
      role: role && ['admin', 'user'].includes(role) ? role : 'user',
    });
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (isValidId(id)) {
      const user = await User.findById(id);
      if (user) {
        return res.json({
          success: true,
          data: user,
        });
      }
    }
    return res.status(404).json({
      success: false,
      message: 'user not found',
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, password, role } = req.body;
  try {
    if (isValidId(id)) {
      const user = await User.findById(id);
      if (user) {
        if (name) {
          user.name = name;
        }
        if (username) {
          user.username = username;
        }
        if (password) {
          user.password = await bcrypt.hash(password, 10);
        }
        if (role) {
          user.role = role && ['admin', 'user'].includes(role) ? role : 'user';
        }
        user.save();
        delete user.password;
        return res.json({
          success: true,
          data: user,
        });
      }
    }
    return res.status(404).json({
      success: false,
      message: 'user not found',
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (isValidId(id)) {
      const user = await User.findByIdAndDelete(id);
      if (user) {
        return res.sendStatus(204);
      }
    }
    return res.status(404).json({
      success: false,
      message: 'user not found',
    });
  } catch (err) {
    console.log(err);
    req.sendStatus(500);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
