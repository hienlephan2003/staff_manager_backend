const mongoose = require("mongoose");
const AttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  checkInTime: { type: Date, default: Date.now() },
  checkOutTime: { type: Date },
  date: { type: Date },
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
  },
  // type: {
  //   type: String,
  //   enum: ["day", "shift"],
  //   default: "day",
  // },
  // timesheetId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "TimeSheet",
  // },
  // results: [
  //   {
  //     shiftId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Shift",
  //       required: true,
  //     },
  //     attended: { type: Boolean },
  //     point: { type: Number, default: 0 },
  //     lateMinutes: { type: Number, default: 0 },
  //     soonMinutes: { type: Number, default: 0 },
  //   },
  // ],
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
