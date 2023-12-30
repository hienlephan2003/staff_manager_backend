const mongoose = require("mongoose");

const DegreeSchema = new mongoose.Schema({
  degreeName: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  allowance: Number,
});
const Degree = mongoose.model("Degree", DegreeSchema);

module.exports = Degree;
