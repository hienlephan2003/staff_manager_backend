const mongoose = require("mongoose");
const DepartmentSchema = mongoose.Schema({
  departmentName: String,
  manager: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdDate: Date,
});
