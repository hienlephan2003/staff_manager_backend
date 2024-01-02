const mongoose = require("mongoose");
//
//lay tat ca cac nhan vien co paytype o trong payroll policy dem tinh
const TotalPoint = new mongoose.Schema({
  circleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Circle",
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  expectedPoint: Number,
  actualPoint: Number,
});
const Payslip = mongoose.model("Payslip", TotalPoint);

module.exports = Payslip;
