const mongoose = require("mongoose");

const EmployeeTimesheetSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  timesheetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TimeSheet",
    required: true,
  },
});
const EmployeeTimesheet = mongoose.model(
  "employeetimesheet",
  EmployeeTimesheetSchema
);
module.exports = EmployeeTimesheet;
