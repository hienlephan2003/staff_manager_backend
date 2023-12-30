const mongoose = require("mongoose");

const TimeSheetSchema = new mongoose.Schema({
  timesheetName: { type: String, required: true },
  timesheetType: {
    type: String,
    enum: ["fixed", "dynamic"],
    default: "fixed",
  },
  checkInPolicy: {
    type: String,
    enum: ["day", "shift"],
    default: "day",
  },
  numShiftPerDay: {
    type: Number,
    required: true,
  },
});
const TimeSheet = mongoose.model("TimeSheet", TimeSheetSchema);

module.exports = TimeSheet;
