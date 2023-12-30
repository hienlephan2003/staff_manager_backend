const router = require("express").Router();
const {
  addJobPosition,
  updateJobPosition,
  deleteJobPosition,
  getJobPositions,
  getJobPositionsGroupByType,
} = require("../Controllers/jobPositionController.js");

router.post("/newJobPosition", addJobPosition);
router.post("/updateJobPosition", updateJobPosition);
router.delete("/deleteJobPosition/:id", deleteJobPosition);
router.get("/", getJobPositions);
router.get("/groupByType", getJobPositionsGroupByType);
module.exports = router;
