const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  email: { type: String },
  fullName: String,
  phoneNumber: { type: String, required: true },
  imageUrl: String,
  identifyCardNumber: String,
  dateOfBirth: Date,
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  startTimeWorking: Date,
  dependencePersons: [
    {
      name: String,
      role: String,
    },
  ],
  status: {
    type: String,
    enum: ["working", "leaved"],
  },
  degree: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Degree",
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});
module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
