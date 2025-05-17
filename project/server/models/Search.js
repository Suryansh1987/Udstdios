const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    trim: true
  },
  count: {
    type: Number,
    default: 1
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient searching and aggregation
SearchSchema.index({ term: 1 });
SearchSchema.index({ userId: 1 });

module.exports = mongoose.model('Search', SearchSchema);