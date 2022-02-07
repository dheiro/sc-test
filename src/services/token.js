const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refresh-token');

const generateToken = (payload, key, expires) => {
  const token = jwt.sign(payload, key, {
    expiresIn: expires
  });
  return token;
};

const saveRefreshToken = async (userId, token) => {
  try {
    await RefreshToken.create({
      user: userId,
      token,
      expires: new Date(Date.now() + 20*60*1000),
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getUserIdByToken = async (token) => {
  try {
    const refreshToken = await getRefreshTokenByToken(token);
    if (refreshToken) {
      return refreshToken.user;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

const getRefreshTokenByToken = async (token) => {
  try {
    const refreshToken = await RefreshToken.findOne({ token });
    if (refreshToken) {
      return refreshToken;
    }
    return null;
  } catch (err) {
    throw err;
  }
};

const updateRefreshToken = async (oldToken, newToken) => {
  try {
    const refreshToken = await getRefreshTokenByToken(oldToken);
    if (refreshToken) {
      refreshToken.revokedAt = new Date(Date.now());
      refreshToken.newToken = newToken;
      refreshToken.save();
      return true;
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};

module.exports = {
  generateToken,
  saveRefreshToken,
  getUserIdByToken,
  updateRefreshToken,
};
