const mongoose = require("mongoose");

const ContractTypeSchema = new mongoose.Schema({
  contractTypeName: string,
  description: String,
});
const ContractType = mongoose.model("ContractType", ContractTypeSchema);

module.exports = ContractType;
