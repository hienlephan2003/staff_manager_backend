const mongoose = require("mongoose");
const ShiftTypeSchema = mongoose.Schema({
  shiftTypeName: { type: String, required: true },
  point: { type: Number, required: true },
});

const ShiftType = mongoose.model("ShiftTypeSchema", ShiftTypeSchema);

module.exports = ShiftType;
