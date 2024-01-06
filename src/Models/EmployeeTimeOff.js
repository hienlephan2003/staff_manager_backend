const mongoose = require("mongoose");

const EmployeeTimeOffSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  timeOffTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  remain: Number,
  joinDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "disable"],
    default: "active",
  },
});
const EmployeeTimeOff = mongoose.model(
  "EmployeeTimeOff",
  EmployeeTimeOffSchema
);

module.exports = EmployeeTimeOff;
