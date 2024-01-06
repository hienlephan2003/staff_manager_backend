const mongoose = require("mongoose");

const ParameterSchema = new mongoose.Schema({
  incomeMinusDepentdenciesPeople: Number,
  incomeMinusPersonal: Number,
  maxSociaInsurance: Number,
  maxUnemploymentInsurance: Number,
  socialInsuranceCompanyRate: Number,
  socialInsuranceEmployeeRate: Number,
  unemploymentInsuranceCompanyRate: Number,
  unemploymentInsuranceEmploymentRate: Number,
});
module.exports = Parameter = mongoose.model("Parameter", ParameterSchema);
