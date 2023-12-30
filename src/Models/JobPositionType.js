const mongoose = require("mongoose");

const JobPositionTypeSchema = new mongoose.Schema({
  jobPositionTypeName: String,
  description: String,
});
const JobPositionType = mongoose.model(
  "JobPositionType",
  JobPositionTypeSchema
);

module.exports = JobPositionType;
