const mongoose = require("mongoose");

const MoneyItemSchema = new mongoose.Schema({
  moneyTypeId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: {
    type: String,
    enum: ["fixed", "input", "percent", "formular"],
  },
  value: String,
});
const MoneyItem = mongoose.model("MoneyItem", MoneyItemSchema);

module.exports = MoneyItem;
