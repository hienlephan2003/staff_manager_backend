const router = require("express").Router();
const {
  addTimeOffRequest,
  updateTimeOff,
  createTimeOffType,
  applyTimeOffForAllEmployee,
  getTimeOffTypes,
} = require("../Controllers/timeoffController.js");
const verifyToken = require("../MiddleWares/verifyToken.js");

router.post("/", verifyToken, addTimeOffRequest);
router.post("/review", updateTimeOff);
router.post("/type", createTimeOffType);
router.post("/apply", applyTimeOffForAllEmployee);
router.get("/list", getTimeOffTypes);
module.exports = router;
