const moment = require("moment");
const Attendance = require("../Models/Attendance");
const attendanceService = require("../Services/attendaceService");

const attendanceController = {
  getAttendace: async (req, res) => {
    try {
      const today = moment().startOf("day");
      const tomorrow = moment(today).endOf("day");

      const employeeId = req.body.user.employeeId;
      const todayAttendance = await Attendance.findOne({
        employeeId: employeeId,
        checkInTime: { $gte: today.toDate(), $lt: tomorrow.toDate() },
      });
      if (!todayAttendance) res.status(200).json("Not found");
      else res.status(200).json(todayAttendance);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addAttendance: async (req, res) => {
    try {
      console.log("add att");
      const employeeId = req.body.user.employeeId;
      const today = moment().startOf("day");
      const tomorrow = moment(today).endOf("day");
      const attendance = await Attendance.findOne({
        employeeId,
        checkInTime: { $gte: today.toDate(), $lt: tomorrow.toDate() },
      });
      if (attendance) {
        attendance.checkOutTime = new Date();
        await attendance.save();
        return res.status(200).json(attendance);
      } else {
        const employeeId = req.body.user.employeeId;
        const newAttendance = await Attendance.create({
          employeeId: employeeId,
          checkInTime: new Date(),
        });
        return res.status(200).json(newAttendance);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getAttendances: async (req, res) => {
    try {
      const { month, year } = req.query;
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      console.log(startDate, endDate);
      const attendances = await Attendance.find({
        checkInTime: {
          $gte: startDate,
          $lte: endDate,
        },
      });
      res.status(200).json(attendances);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  addListAttendances: async (req, res) => {
    try {
      const newAttendance = await Attendance.insertMany(req.body);
      res.status(200).json(newAttendance);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getAttendancePoint: async (req, res) => {
    try {
      const data = {
        employeeId: req.body.employeeId,
        timesheetId: req.body.timesheetId,
        month: req.body.month,
        year: req.body.year,
      };
      attendanceService
        .calculatePoint(
          data.employeeId,
          data.timesheetId,
          data.month,
          data.year
        )
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
module.exports = attendanceController;
