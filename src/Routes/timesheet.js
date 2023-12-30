const router = require("express").Router();
const {
  getShiftTypes,
  addShiftType,
  addTimeSheet,
} = require("../Controllers/timeSheetController.js");

router.post("/shiftType", addShiftType);
router.get("/shiftType", getShiftTypes);
router.post("/", addTimeSheet);
module.exports = router;
