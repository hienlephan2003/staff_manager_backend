const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  startHour: Number,
  startMinute: Number,
  endHour: Number,
  endMinute: Number,
  timeSheetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TimeSheet",
  },
  shiftType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShiftType",
    required: true,
  },
  date: Date,
});

const Shift = mongoose.model("Shift", shiftSchema);

module.exports = Shift;
