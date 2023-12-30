const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContractType",
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  startDate: { type: Date, required: true },
  expiredDate: { type: Date },
  jobPosition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPosition",
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  overtimeRate: {
    type: Number,
    required: true,
  },
  lateMinusPertime: {
    type: Number,
    required: true,
  },
  moneyItems: [
    {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "MoneyType" },
      value: Number,
    },
  ],
});
const Contract = mongoose.model("Contract", ContractSchema);

module.exports = Contract;
