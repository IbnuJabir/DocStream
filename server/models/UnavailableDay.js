// models/UnavailableDay.js

const mongoose = require("mongoose");

const unavailableDaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UnavailableDay = mongoose.model("UnavailableDay", unavailableDaySchema);

module.exports = UnavailableDay;
