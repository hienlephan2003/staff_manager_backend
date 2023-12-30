const mongoose = require("mongoose");

const ContractTypeSchema = new mongoose.Schema({
  contractTypeName: String,
  description: String,
});
const ContractType = mongoose.model("ContractType", ContractTypeSchema);

module.exports = ContractType;
