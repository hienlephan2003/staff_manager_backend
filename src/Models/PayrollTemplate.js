const mongoose = require("mongoose");
//cong thuc luong
const PayrollTemplateSchema = new mongoose.Schema({
  payroleTemplateName: { type: String, required: true },
  paySchedule: {
    type: String,
    enum: ["month", "week"],
    required: true,
  },
  payRollPolicyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PayRollPolicy",
    required: true,
  },
  formulas: [
    {
      moneyTypeId: mongoose.Schema.Types.ObjectId,
      ref: "MoneyType",
      formula: String,
    },
  ],
});
const PayrollTemplate = mongoose.model(
  "PayrollTemplate",
  PayrollTemplateSchema
);

module.exports = PayrollTemplate;
