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
  dayOfWeek: Number,
});

shiftSchema.pre("save", function (next) {
  console.log("pre save" + this.time);
  const timeString = this.time;
  if (timeString) {
    const [startTime, endTime] = timeString.split(" - ");

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    this.startHour = startHour;
    this.startMinute = startMinute;
    this.endHour = endHour;
    this.endMinute = endMinute;
  }
  next();
});
const Shift = mongoose.model("Shift", shiftSchema);

module.exports = Shift;
