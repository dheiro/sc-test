const bcrypt = require('bcryptjs');
const User = require('../models/user');

const initDB = async (req, res) => {
  try {
    await User.create({
      name: 'Administrator',
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    });
    await User.create({
      name: 'John Doe',
      username: 'user',
      password: await bcrypt.hash('user123', 10),
      role: 'user',
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  initDB,
};
