const router = require("express").Router();
const {
  addEmployeeType,
  updateEmployeeType,
  deleteEmployeeType,
  getEmployeeTypes,
} = require("../Controllers/employeeTypeController.js");

router.post("/newEmployeeType", addEmployeeType);
router.post("/updateEmployeeType", updateEmployeeType);
router.delete("/deleteEmployeeType/:id", deleteEmployeeType);
router.get("/", getEmployeeTypes);
module.exports = router;
