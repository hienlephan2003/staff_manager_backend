const mongoose = require("mongoose");

const TimeOffTypeSchema = new mongoose.Schema({
  typeOffTypeName: { type: String, required: true },
  isAttendance: {
    type: Boolean,
    required: true,
  },
  approver: {
    type: mongoose.Schema.Types.ObjectId,
  },
  isReportToApprover: {
    type: Boolean,
    default: false,
  },
});
const TimeOffType = mongoose.model("TimeOffType", TimeOffTypeSchema);

module.exports = TimeOffType;
