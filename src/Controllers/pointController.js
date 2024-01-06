const ShiftType = require("../Models/ShiftType");
const EmployeeTimesheet = require("../Models/EmployeeTimesheet");
const timesheetService = require("../Services/timeSheetService");
const Shift = require("../Models/Shift");
const Point = require("../Models/Point");
const Attendance = require("../Models/Attendance");
const TimeOff = require("../Models/TimeOff");
const pointService = {
  getAbsenseEmployee: () => {
    EmployeeTimesheet.find({}) // Retrieve all employee timesheets
      .populate("timesheetId") // Populate the timesheet details
      .then((employeeTimesheets) => {
        const employeesWithShifts = [];
        const employeesWithoutShifts = [];

        // Filter employees based on the presence of shifts on the specified date
        employeeTimesheets.forEach((employeeTimesheet) => {
          const shiftsOnDate = employeeTimesheet.timesheetId.shifts.filter(
            (shift) => shift.dayOfWeek === dateToCheck.getDay()
          );
          if (shiftsOnDate.length > 0) {
            employeesWithShifts.push(employeeTimesheet.employeeId);
          } else {
            employeesWithoutShifts.push(employeeTimesheet.employeeId);
          }
        });

        Attendance.find({ date: dateToCheck }) // Find employees who attended work
          .distinct("employeeId")
          .then((attendedEmployees) => {
            const notScheduledNotAttended = employeesWithoutShifts.filter(
              (employeeId) => !attendedEmployees.includes(employeeId)
            );
            const scheduledNotAttended = employeesWithShifts.filter(
              (employeeId) => !attendedEmployees.includes(employeeId)
            );

            Employee.find({ _id: { $in: notScheduledNotAttended } })
              .then((notScheduledNotAttendedEmployees) => {
                Employee.find({ _id: { $in: scheduledNotAttended } })
                  .then((scheduledNotAttendedEmployees) => {
                    console.log(
                      "Employees who didn't have a shift and didn't attend work:",
                      notScheduledNotAttendedEmployees
                    );
                    console.log(
                      "Employees who had a shift but didn't attend work:",
                      scheduledNotAttendedEmployees
                    );
                  })
                  .catch((err) => {
                    console.error(
                      "Error fetching scheduled not attended employees:",
                      err
                    );
                  });
              })
              .catch((err) => {
                console.error(
                  "Error fetching not scheduled not attended employees:",
                  err
                );
              });
          })
          .catch((err) => {
            console.error("Error fetching attended employees:", err);
          });
      })
      .catch((err) => {
        console.error("Error fetching employee timesheets:", err);
      });
  },
  createPointsForAbsentEmployees: async () => {
    try {
      const yesterday = moment().subtract(1, "days").startOf("day").toDate();
      const allEmployeeTimesheets = await EmployeeTimesheet.find({});

      for (const employeeTimesheet of allEmployeeTimesheets) {
        const shiftsForEmployee = await Shift.find({
          timeSheetId: employeeTimesheet.timesheetId,
          dayOfWeek: yesterday.getDay(),
        });
        const attendedYesterday = await Point.findOne({
          employeeId: employeeTimesheet.employeeId,
          date: yesterday,
        });
        if (!attendedYesterday) {
          const timeOff = await TimeOff.findOne({
            employeeId: employeeTimesheet.employeeId,
            endDate: {
              $gte: yesterday,
            },
            startDate: {
              $lte: yesterday,
            },
            status: "approved",
          });
          if (timeOff != null) {
            for (const shift of shiftsForEmployee) {
              const newPoint = new Point({
                employeeId: employeeTimesheet.employeeId,
                shiftId: shift._id,
                date: yesterday,
                point: shift.point,
                lateMinutes: 0,
                soonMinutes: 0,
              });
              await newPoint.save();
            }
          } else {
            for (const shift of shiftsForEmployee) {
              const newPoint = new Point({
                employeeId: employeeTimesheet.employeeId,
                shiftId: shift._id,
                date: yesterday,
                point: 0,
                lateMinutes: 0,
                soonMinutes: 0,
              });
              await newPoint.save();
            }
          }
        }
      }
    } catch (error) {
      console.error("Error creating points:", error);
    }
  },
};
const pointController = {
  createPoints: async (req, res) => {
    try {
      const data = {
        date: req.body.date,
      };
      const employeeTimesheet = await EmployeeTimesheet.find({});
      console.log(employeeTimesheet);
      for (const item in employeeTimesheet) {
        const shifts = await Shift.aggregate([
          {
            $match: {
              employeeId: item.employeeId,
              timesheetId: item.timeSheetId,
              dayOfWeek: new Date(data.date).getDay(),
            },
          },
          {
            $addFields: {
              date: req.body.date,
              point: 0,
              attendance: false,
              lateMinute: 0,
              soonMinute: 0,
            },
          },
        ]);
        let points = [];
        if (shifts.length > 0) {
          points = await Point.updateMany({});
        }
      }
      //   res.status(200).json(shifts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addPoint: async (req, res) => {
    try {
      const data = {
        employeeId: req.body.employeeId,
        point: req.body.point,
        lateMinutes: 0,
        soonMinutes: 0,
        date: req.body.date,
      };
      const point = await Point.create(data);
      res.status(200).json(point);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = pointController;
