const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  email: { type: String },
  fullName: String,
  phoneNumber: { type: String, required: true, unique: true },
  imageUrl: String,
  identifyCardNumber: String,
  dateOfBirth: Date,
  addressId: { type: mongoose.Types.ObjectId, required: true },
  startTimeWorking: Date,
});
const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
