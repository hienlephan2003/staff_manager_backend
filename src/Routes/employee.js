const router = require("express").Router();
const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../Controllers/employeeController.js");

router.post("/newEmployee", addEmployee);
router.post("/updateEmployee", updateEmployee);
router.post("/deleteEmployee", deleteEmployee);

module.exports = router;
