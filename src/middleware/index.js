const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateAccessToken = (req, res, next) => {
  try {
    let token = req.get('Authorization');
    if (token) {
      token = token.split(' ')[1];
      const decode = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      req.user = {
        id: decode.id,
        name: decode.name,
        username: decode.username,
        role: decode.role,
      };
      return next();
    }
    return res.status(401).json({
      success: false,
      message: 'token not provided',
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  const { user } = req;
  try {
    const checkedUser = await User.findById(user.id);
    if (checkedUser && checkedUser.role === 'admin') {
      return next();
    }
    return res.status(403).json({
      success: false,
      message: 'admin only, you are not allowed',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const onlyMe = (req, res, next) => {
  const { user } = req;
  if (user.id === req.params.id) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'you only allowed access your data',
  });
};

module.exports = {
  authenticateAccessToken,
  isAdmin,
  onlyMe,
};
