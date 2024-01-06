const mongoose = require("mongoose");

const HolidaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: {
    type: Date,
  },
  length: {
    type: Number,
    default: 1,
  },
});
const Holiday = mongoose.model("Holiday", HolidaySchema);

module.exports = Holiday;
