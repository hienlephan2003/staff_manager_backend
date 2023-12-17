const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
    required: true,
  },
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: { type: Date },
  lateCheckIn: {
    type: Boolean,
    default: false,
  },
  soonCheckout: {
    type: Boolean,
    default: false,
  },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
