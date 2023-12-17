const mongoose = require("mongoose");

const TimeSheetSchema = new mongoose.Schema({
  timesheetName: { type: String, required: true },
  timesheetType: {
    type: String,
    enum: ["fixed", "dynamic"],
    required: true,
  },
  checkInPolicy: {
    type: String,
    enum: {
      type: String,
      enum: ["day", "shift"],
      required: true,
    },
    numShiftPerDay: {
      type: Number,
      required: true,
    },
    shifts: [
      {
        dayOfWeek: { type: Number, required: true },
        startHour: { type: Date, required: true },
        endHour: { type: Date, required: true },
        typeShift: {
          type: String,
          enum: ["standard", "overtime"],
          required: true,
        },
      },
    ],
  },
});
const TimeSheet = mongoose.model("TimeSheet", TimeSheetSchema);

module.exports = TimeSheet;
