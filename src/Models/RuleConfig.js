const mongoose = require("mongoose");

const RuleConfigSchema = new mongoose.Schema({
  incomeMinusPersonal: {
    type: Number,
  },
  incomeMinusDepentdenciesPeople: {
    type: Number,
  },
  unemploymentInsuranceEmploymentRate: {
    type: Number,
  },
  unemploymentInsuranceCompanyRate: {
    type: Number,
  },
  socialInsuranceEmployeeRate: {
    type: Number,
  },
  socialInsuranceCompanyRate: {
    type: Number,
  },
});
const RuleConfig = mongoose.model("RuleConfig", RuleConfigSchema);

module.exports = RuleConfig;
