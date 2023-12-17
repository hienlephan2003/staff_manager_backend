const mongoose = require("mongoose");

const MoneyTypeSchema = new mongoose.Schema({
  moneyTypeName: string,
  description: String,
});
const MoneyType = mongoose.model("MoneyType", MoneyTypeSchema);

module.exports = MoneyType;
