const router = require("express").Router();
const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  getEmployeeList,
} = require("../Controllers/employeeController.js");

router.post("/newEmployee", addEmployee);
router.post("/updateEmployee", updateEmployee);
router.delete("/deleteEmployee", deleteEmployee);
router.get("/list", getEmployeeList);
router.get("/:id", getEmployee);
module.exports = router;

// localhost:3000/api/degree/newDegree
// localhost:3000/api/degree/updateDegree
// localhost:3000/api/degree/deleteDegree/223
// localhost:3000/api/degree/
