const mongoose = require("mongoose");

const JobPositionSchema = new mongoose.Schema({
  positionName: { type: String, required: true },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  positionType: {
    type: mongoose.Types.ObjectId,
    ref: "JobPositionType",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  minSalary: Number,
  maxSalary: Number,
});
const JobPosition = mongoose.model("JobPosition", JobPositionSchema);

module.exports = JobPosition;
