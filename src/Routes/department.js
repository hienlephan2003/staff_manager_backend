const router = require("express").Router();
const {
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartments,
} = require("../Controllers/departmentController.js");

router.post("/newDepartment", addDepartment);
router.post("/updateDepartment", updateDepartment);
router.get("/", getDepartments);
router.delete("/:id", deleteDepartment);
// router.delete("/deleteDepartment", deleteDepartment);
// router.get("/:id", getDepartment);
module.exports = router;
