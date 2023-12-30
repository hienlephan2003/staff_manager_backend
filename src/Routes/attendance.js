const router = require("express").Router();
const {
  getAttendace,
  addAttendance,
  getAttendances,
  addListAttendances,
  getAttendancePoint,
} = require("../Controllers/attendaceController.js");
const verifyToken = require("../MiddleWares/verifyToken.js");

router.get("/", verifyToken, getAttendace);
router.post("/", verifyToken, addAttendance);
router.get("/attendances/", getAttendances);
router.post("/list", addListAttendances);
router.get("/point", getAttendancePoint);
module.exports = router;
