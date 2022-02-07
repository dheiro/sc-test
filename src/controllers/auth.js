const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken, saveRefreshToken, getUserIdByToken, updateRefreshToken } = require('../services/token');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username,
    });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const payload = {
          id: user._id,
          name: user.name,
          username: user.username,
          role: user.role,
        };
        const accessToken = generateToken(payload, process.env.ACCESS_TOKEN_KEY, '5m');
        const refreshToken = generateToken(payload, process.env.REFRESH_TOKEN_KEY, '20m');
        await saveRefreshToken(user._id, refreshToken);
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

const refreshToken = async (req, res) => {
  const { token } = req.body;
  if (token) {
    try {
      const userId = await getUserIdByToken(token);
      if (userId) {
        const user = await User.findById(userId);
        if (user) {
          const payload = {
            id: user._id,
            name: user.name,
            username: user.username,
            role: user.role,
          };
          const accessToken = generateToken(payload, process.env.ACCESS_TOKEN_KEY, '5m');
          const refreshToken = generateToken(payload, process.env.REFRESH_TOKEN_KEY, '20m');
          await updateRefreshToken(token, refreshToken);
          return res.json({
            success: true,
            data: {
              user,
              accessToken,
              refreshToken,
            },
          });
        }
      }
      return res.status(404).json({
        success: false,
        message: 'token not in database',
      });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
  return res.status(400).json({
    success: false,
    message: 'token not provided in json body',
  });
};

module.exports = {
  login,
  refreshToken,
};
