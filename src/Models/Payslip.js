const mongoose = require("mongoose");
//
//lay tat ca cac nhan vien co paytype o trong payroll policy dem tinh
const PayslipSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  payrollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payroll",
    required: true,
  },
  totalSalary: Number,
  moneyItems: [
    {
      moneyTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MoneyType",
      },
      value: Number,
    },
  ],
});
const Payslip = mongoose.model("Payslip", PayslipSchema);

module.exports = Payslip;
