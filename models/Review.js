const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  link: {
    type: String,
  },
  rating: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.review || mongoose.model('review', ReviewSchema);
