const mongoose = require("mongoose");

const MoneyTypeSchema = new mongoose.Schema({
  moneyTypeName: String,
  description: String,
  type: {
    type: String,
    enum: ["fixed", "percent"],
    default: "fixed",
  },
});
const MoneyType = mongoose.model("MoneyType", MoneyTypeSchema);

module.exports = MoneyType;
