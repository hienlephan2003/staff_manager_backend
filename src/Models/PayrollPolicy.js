const mongoose = require("mongoose");

const PayrollPolicySchema = new mongoose.Schema({
  policyName: string,
  description: String,
});
const PayrollPolicy = mongoose.model("PayrollPolicy", PayrollPolicySchema);

module.exports = PayrollPolicy;
