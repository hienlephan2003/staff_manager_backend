const mongoose = require("mongoose");

const TimeOffTypeSchema = new mongoose.Schema({
  timeOffTypeName: { type: String, required: true },
  numOfDate: Number,
  status: { type: String, enum: ["disable", "active"], default: "active" },
  increasePerMonth: Number,
  timeOffType: {
    type: String,
    enum: ["reserve", "notreserve"],
  },
  addForOlds: [
    {
      minDate: Number,
      amount: Number,
    },
  ],
});
const TimeOffType = mongoose.model("TimeOffType", TimeOffTypeSchema);

module.exports = TimeOffType;
