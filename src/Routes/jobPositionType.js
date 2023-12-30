const router = require("express").Router();
const {
  addJobPositionType,
  updateJobPositionType,
  deleteJobPositionType,
  getAllJobPositionTypes,
} = require("../Controllers/jobPositionTypeController");
router.get("/", getAllJobPositionTypes);
router.post("/newJobPositionType", addJobPositionType);
router.post("/updateJobPositionType", updateJobPositionType);
router.delete("/deleteJobPositionType/:id", deleteJobPositionType);
module.exports = router;
