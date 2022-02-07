const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_, user) => {
      delete user.password;
      return user;
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
