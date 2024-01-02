const router = require("express").Router();
const {
  getTodayAttendances,
  addAttendanceCheckIn,
  addAttendanceCheckOut,
  getAttendances,
  addListAttendances,
  getAttendancePoint,
  addAttendanceCheckOut2,
  addListAttendancesCheckOut,
  getAttendancesPoint,
} = require("../Controllers/attendaceController.js");
const verifyToken = require("../MiddleWares/verifyToken.js");

router.get("/", verifyToken, getTodayAttendances);
router.post("/checkIn", verifyToken, addAttendanceCheckIn);
router.post("/checkOut", verifyToken, addAttendanceCheckOut);
router.post("/checkOut2", addAttendanceCheckOut2);
router.get("/attendances/", getAttendances);
router.post("/list", addListAttendances);
router.post("/listCheckOut", addListAttendancesCheckOut);
router.get("/point", getAttendancePoint);
router.get("/points/", verifyToken, getAttendancesPoint);
module.exports = router;
