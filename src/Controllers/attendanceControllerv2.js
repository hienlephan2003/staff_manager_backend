const moment = require("moment");
const Attendance = require("../Models/Attendance");
const attendanceService2 = require("../Services/attendanceServicev2");
const Shift = require("../Models/Shift");
const TimeSheet = require("../Models/TimeSheet");
const Contract = require("../Models/Contract");
const EmployeeTimesheet = require("../Models/EmployeeTimesheet");
const timesheetService = require("../Services/timeSheetService");

const attendanceControllerv2 = {
  //use
  getTodayAttendances: async (req, res) => {
    try {
      const today = moment().startOf("day").add(1);
      const tomorrow = moment(today).endOf("day").add(1);
      const employeeId = req.body.user.employeeId;
      const employeeTimesheet = await EmployeeTimesheet.findOne({
        employeeId,
      }).populate("timesheetId");
      console.log(employeeTimesheet);
      const shifts = await Shift.aggregate([
        {
          $match: {
            timeSheetId: employeeTimesheet.timesheetId._id,
            $expr: {
              $or: [
                { $eq: ["$date", today] },
                { $eq: ["$dayOfWeek", today.day()] },
              ],
            },
          },
        },
      ]);
      if (!shifts || shifts.length == 0) res.status(200).json("Not found");
      else {
        const attendances = await Attendance.find({
          employeeId: employeeId,
          checkInTime: { $gte: today.toDate(), $lt: tomorrow.toDate() },
        });
        res.status(200).json({
          timesheet: employeeTimesheet.timesheetId,
          shifts,
          attendances,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //use
  addAttendanceCheckIn: async (req, res) => {
    try {
      console.log("theem check in ne");
      const employeeId = req.body.user.employeeId;
      console.log(employeeId);
      const emti = await EmployeeTimesheet.findOne({
        employeeId,
      }).populate("timesheetId");
      const shiftId = req.body.shiftId;
      const today = moment().startOf("day");
      const tomorrow = moment(today).endOf("day");
      if (emti.timesheetId.checkInPolicy == "day") {
        const attendance = await Attendance.findOne({
          employeeId,
          checkInTime: { $gte: today.toDate(), $lt: tomorrow.toDate() },
        });
        if (attendance) {
          return res.status(201).json("Check in exists");
        } else {
          const newAttendance = await Attendance.create({
            employeeId,
            date: new Date(),
            checkInTime: new Date(),
          });
          return res.status(200).json(newAttendance);
        }
      } else if (emti.timesheetId.checkInPolicy == "shift" && shiftId != null) {
        const attendance = await Attendance.findOne({
          employeeId,
          checkInTime: { $gte: today.toDate(), $lt: tomorrow.toDate() },
          shiftId: shiftId,
        });
        if (attendance) {
          return res.status(201).json("Check in exists");
        } else {
          const newAttendance = await Attendance.create({
            employeeId: employeeId,
            date: new Date(),
            checkInTime: new Date(),
            shiftId,
          });
          return res.status(200).json(newAttendance);
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  addAttendanceCheckOut: async (req, res) => {
    try {
      attendanceService2
        .updateAttendanceAndCreatePoints(
          req.body.attendanceId,
          req.body.checkOutTime
        )
        .then((data) => res.status(200).json(data))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getAttendancesPoint: async (req, res) => {
    try {
      const { month, year } = req.query;
      const employeeId = req.body.user.employeeId;
      console.log(employeeId);
      attendanceService2
        .getPoint(employeeId, month, year)
        .then((data) => res.status(200).json(data))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  getAlllEmployeeAttendancePoints: async (req, res) => {
    try {
      const { month, year } = req.query;
      attendanceService2
        .getAllPoint(month, year)
        .then((data) => res.status(200).json(data))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
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
  addListAttendancesCheckOut: async (req, res) => {
    try {
      const list = req.body;
      let resdata = [];
      list.map((item) => {
        attendanceService2
          .checkOutAttendance2(item.attendanceId, item.checkOutTime)
          .then((data) => {
            console.log(data);
            resdata.push(data);
          })
          .catch((err) => {
            console.log(err);
            // return res.status(500).json(err);
          });
      });
      res.status(200).json(resdata);
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
      console.log(data);
      const startOfMonth = new Date(data.year, data.month - 1, 1);
      const endOfMonth = new Date(data.year, data.month, 0, 23, 59, 59);
      // const attendances = await Attendance.find({
      //   employeeId: data.employeeId,
      //   // timesheetId: data.timesheetId,
      //   // checkInTime: {
      //   //   $gte: startOfMonth,
      //   //   $lte: endOfMonth,
      //   // },
      // });
      // res.status(200).json(attendances);
      attendanceService
        .calculatePoint2(
          data.employeeId,
          data.timesheetId,
          data.month,
          data.year
        )
        .then((data) => res.status(200).json(data))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
module.exports = attendanceControllerv2;
