const router = require("express").Router();
const {
  loginUser,
  addUser,
  updateUser,
} = require("../Controllers/userController.js");
router.post("/login", loginUser);
router.post("/addUser", addUser);
router.post("/updateUser", updateUser);
module.exports = router;
