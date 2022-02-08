const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateAccessToken = (req, res, next) => {
  try {
    let token = req.get('Authorization');
    if (token) {
      token = token.split(' ')[1];
      const decode = jwt.verify(token, process.env.EXPRESS_ACCESS_TOKEN_KEY);
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
    if (await checkIsAdmin(user.id)) {
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

const onlyMe = async (req, res, next) => {
  const { user } = req;
  if (await checkIsAdmin(user.id)) {
    return next();
  }
  if (user.id === req.params.id) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'you only allowed access your data',
  });
};

const checkIsAdmin = async (id) => {
  try {
    const user = await User.findById(id);
    return (user && user.role === 'admin');
  } catch (err) {
    throw err;
  }
};

const verifyRefreshTokenValidityFromBody = (req, res, next) => {
  const { token } = req.body;
  try {
    if (token && jwt.verify(token, process.env.EXPRESS_REFRESH_TOKEN_KEY)) {
      return next();
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'token not valid or expired',
    });
  }
};

module.exports = {
  authenticateAccessToken,
  isAdmin,
  onlyMe,
  verifyRefreshTokenValidityFromBody,
};
