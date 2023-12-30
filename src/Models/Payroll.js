const mongoose = require("mongoose");
//
//lay tat ca cac nhan vien co paytype o trong payroll policy dem tinh
const PayrollSchema = new mongoose.Schema({
  payrollTemplateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PayrollId",
    required: true,
  },
  payrollCircle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Circle",
    required: true,
  },
});
const Payroll = mongoose.model("Payroll", PayrollSchema);

module.exports = Payroll;
