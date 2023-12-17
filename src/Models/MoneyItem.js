const mongoose = require("mongoose");

const MoneySchema = new mongoose.Schema({
  moneyTypeId: { type: mongoose.Types.ObjectId, required: true },
  type: {
    type: String,
    enum: ["fixed", "input", "percent", "formular"],
  },
  value: String,
});
const Money = mongoose.model("Money", MoneySchema);

module.exports = Money;
