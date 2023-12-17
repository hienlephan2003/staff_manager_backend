const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
  contractType: {
    type: mongoose.Types.ObjectId,
    ref: "ContractType",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  jobPosition: {
    type: mongoose.Types.ObjectId,
    ref: "JobPosition",
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});
const Contract = mongoose.model("Contract", ContractSchema);

module.exports = Contract;
