const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  token: String,
  expires: Date,
  revokedAt: {
    type: Date,
    default: null,
  },
  newToken: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
