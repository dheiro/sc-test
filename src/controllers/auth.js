const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username,
    });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const accessToken = jwt.sign({
          id: user._id,
          name: user.name,
          username: user.username,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: '5m',
        });
        const refreshToken = jwt.sign({
          id: user._id,
          name: user.name,
          username: user.username,
          role: user.role,
        },
        process.env.REFRESH_TOKEN_KEY,
        {
          expiresIn: '20m',
        });
        return res.json({
          success: true,
          data: {
            user,
            accessToken,
            refreshToken,
          },
        });
      }
      return res.status(401).json({
        success: false,
        message: 'wrong password',
      })
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  login,
};
