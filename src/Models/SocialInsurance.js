const mongoose = require("mongoose");

const SocialInsuranceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  socialInsuranceId: {
    type: String,
    required: true,
  },
  activeDate: {
    type: Date,
  },
});
const SocialInsurance = mongoose.model(
  "SocialInsurance",
  SocialInsuranceSchema
);

module.exports = SocialInsurance;
