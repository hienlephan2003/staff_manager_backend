const mongoose = require("mongoose");

const JobPositionSchema = new mongoose.Schema({
  positionName: { type: String, required: true },
  positionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPositionType",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  minSalary: Number,
  maxSalary: Number,
  allowance: Number,
});
const JobPosition = mongoose.model("JobPosition", JobPositionSchema);

module.exports = JobPosition;
