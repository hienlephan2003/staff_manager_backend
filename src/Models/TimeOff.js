const mongoose = require("mongoose");

const TimeOffSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  timeOffTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TimeSheet",
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  shiftCount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
  },
});
const TimeOff = mongoose.model("TimeOff", TimeOffSchema);

module.exports = TimeOff;
