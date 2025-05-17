const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true,
    enum: ['google', 'github', 'facebook']
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  searchHistory: [
    {
      term: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);