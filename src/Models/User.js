const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String },
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
    default: "user",
  },
  employeeId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
