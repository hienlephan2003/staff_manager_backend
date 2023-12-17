const mongoose = require("mongoose");

const JobPositionTypeSchema = new mongoose.Schema({
  policyName: string,
  description: String,
});
const JobPositionType = mongoose.model(
  "JobPositionType",
  JobPositionTypeSchema
);

module.exports = JobPositionType;
