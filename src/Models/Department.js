const mongoose = require("mongoose");
const DepartmentSchema = mongoose.Schema({
  departmentName: { type: String, required: true },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});
const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
