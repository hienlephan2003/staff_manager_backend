const mongoose = require("mongoose");

const TimeOffSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  timeOffTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TimeOffType",
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
  },
  numOfDate: Number,
});
const TimeOff = mongoose.model("TimeOff", TimeOffSchema);

module.exports = TimeOff;
