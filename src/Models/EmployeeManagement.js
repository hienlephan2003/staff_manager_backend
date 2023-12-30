const mongoose = require("mongoose");

const EmployeeManagementSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  directReporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});
module.exports = EmployeeManagement = mongoose.model(
  "EmployeeManagement",
  EmployeeManagementSchema
);
