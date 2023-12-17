const mongoose = require("mongoose");
//xoay vong de co the them payroll trong cycle do
const CycleSchema = new mongoose.Schema({
  cycleName: { type: String, required: true },
  paySchedule: {
    type: String,
    enum: ["month", "week"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});
const Cycle = mongoose.model("Cycle", CycleSchema);

module.exports = Cycle;
