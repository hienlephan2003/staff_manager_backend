const { default: mongoose } = require("mongoose");

const ShiftSchema = mongoose.Schema({
  timeSheetId: {
    type: mongoose.Types.ObjectId,
    ref: "TimeSheet",
  },
  dayOfWeek: { type: Number, required: true },
  startHour: { type: Date, required: true },
  endHour: { type: Date, required: true },
  typeShift: {
    type: String,
    enum: ["standard", "overtime"],
    required: true,
  },
});

module.exports = Shift = mongoose.model("ShiftSchema", ShiftSchema);
