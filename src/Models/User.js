const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String },
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
    default: "employee",
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
