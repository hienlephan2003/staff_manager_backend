const mongoose = require("mongoose");
//
//lay tat ca cac nhan vien co paytype o trong payroll policy dem tinh
const PointSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
  },
  date: {
    type: Date,
    required: true,
  },
  attended: Boolean,
  point: Number,
  lateMinutes: Number,
  soonMinutes: Number,
});
const Point = mongoose.model("Point", PointSchema);

module.exports = Point;
