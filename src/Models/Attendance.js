const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: { type: Date },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
