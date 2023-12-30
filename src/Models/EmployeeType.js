const mongoose = require("mongoose");

const EmployeeTypeTypeSchema = new mongoose.Schema({
  employeeTypeName: String,
  description: String,
});
const EmployeeTypeType = mongoose.model(
  "EmployeeTypeType",
  EmployeeTypeTypeSchema
);

module.exports = EmployeeTypeType;
