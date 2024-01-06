const router = require("express").Router();
const {
  getTodayAttendances,
  addAttendanceCheckIn,
  addAttendanceCheckOut,
  getAttendancesPoint,
  getAlllEmployeeAttendancePoints,
} = require("../Controllers/attendanceControllerv2.js");
const verifyToken = require("../MiddleWares/verifyToken.js");

router.get("/", verifyToken, getTodayAttendances);
router.post("/checkIn", verifyToken, addAttendanceCheckIn);
router.post("/checkOut", verifyToken, addAttendanceCheckOut);
router.get("/point", verifyToken, getAttendancesPoint);
router.get("/point/all", getAlllEmployeeAttendancePoints);
module.exports = router;
