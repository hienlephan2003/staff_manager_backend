const Attendance = require("../Models/Attendance");
const Shift = require("../Models/Shift");
const TimeSheet = require("../Models/TimeSheet");

const timesheetService = {
  createNewTimeSheet: (timesheet) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newTimeSheet = await TimeSheet.create(timesheet);
        resolve(newTimeSheet);
      } catch (e) {
        reject(e);
      }
    });
  },
  createShifts: (data, timeSheetId) => {
    return new Promise(async (res, rej) => {
      try {
        const validShifts = [];
        for (const dayShifts of data) {
          let dayOfWeek = data.indexOf(dayShifts);
          for (const shift of dayShifts) {
            if (shift.time !== "" && shift.shiftType !== "") {
              // validShifts.push({ ...shift, dayOfWeek, timeSheetId });
              const [startTime, endTime] = shift.time.split(" - ");
              const [startHour, startMinute] = startTime.split(":").map(Number);
              const [endHour, endMinute] = endTime.split(":").map(Number);

              const shifts = new Shift({
                ...shift,
                startHour,
                endHour,
                startMinute,
                endMinute,
                dayOfWeek,
                timeSheetId,
              });
              await shifts.save();
              validShifts.push(shifts);
            }
          }
        }
        console.log(validShifts);
        // const savedShifts = await Shift.insertMany(validShifts);
        // console.log("Valid shifts saved:", savedShifts);
        res(validShifts);
      } catch (err) {
        rej(err);
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
