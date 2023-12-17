const Attendance = require("../Models/Attendance");
const TimeSheet = require("../Models/TimeSheet");

const timesheetService = {
  createNewTimeSheet: (timesheet) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newTimeSheet = new TimeSheet(timesheet);
        const saveTimeSheet = await newTimeSheet.save();
      } catch (e) {
        reject(e);
      }
    });
  },
  createAttendance: (shiftId, checkTime) => {
    return new Promise(async (res, rej) => {
      try {
        const attendance = new Attendance({
          employeeId,
          shiftId,
          checkInTime: checkTime,
        });

        await attendance.save();
        console.log("Attendance created successfully");
      } catch (error) {
        console.error("Error creating attendance:", error.message);
      }
    });
  },
};
module.exports = timesheetService;
