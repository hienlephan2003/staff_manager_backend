const Attendance = require("../Models/Attendance");
const Shift = require("../Models/Shift");
const ShiftType = require("../Models/ShiftType");

const attendanceService = {
  calculatePoint: async (employeeId, timesheetId, month, year) => {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59);

    const shifts = await Shift.find({ timeSheetId: timesheetId });
    const shiftsCount = shifts.length;

    const monthlyAttendance = [];

    for (let day = 1; day <= endOfMonth.getDate(); day++) {
      const currentDate = new Date(year, month - 1, day);
      const dayOfWeek = currentDate.getDay();

      const dayAttendance = {
        date: currentDate,
        shifts: [],
        attendedShifts: [],
        totalShiftWorkTime: 0,
        totalWorkTime: 0,
        totalPoint: 0,
      };

      const dayShifts = shifts.filter((shift) => shift.dayOfWeek === dayOfWeek);

      const attendance = await Attendance.findOne({
        employeeId,
        checkInTime: {
          $gte: new Date(year, month - 1, day),
          $lte: new Date(year, month - 1, day + 1),
        },
      });

      for (const shift of dayShifts) {
        const shiftType = await ShiftType.findById(shift.shiftType);
        const shiftWorkTime =
          shift.endHour * 60 +
          shift.endMinute -
          (shift.startHour * 60 + shift.startMinute);

        const shiftDetail = {
          shiftId: shift._id,
          shiftType: shiftType ? shiftType.shiftTypeName : "",
          attended: !!attendance,
          lateMinutes: 0,
          earlyLeaveMinutes: 0,
          actualPoint: 0,
        };

        if (attendance) {
          const checkInTime = new Date(attendance.checkInTime);
          const shiftStartTime = new Date(
            year,
            month - 1,
            day,
            shift.startHour,
            shift.startMinute
          );
          const shiftEndTime = new Date(
            year,
            month - 1,
            day,
            shift.endHour,
            shift.endMinute
          );

          if (checkInTime > shiftStartTime) {
            const lateMinutes = Math.floor(
              (checkInTime - shiftStartTime) / 60000
            );
            shiftDetail.lateMinutes = lateMinutes;
          }

          if (
            attendance.checkOutTime &&
            new Date(attendance.checkOutTime) < shiftEndTime
          ) {
            const earlyLeaveMinutes = Math.floor(
              (shiftEndTime - new Date(attendance.checkOutTime)) / 60000
            );
            shiftDetail.earlyLeaveMinutes = earlyLeaveMinutes;
          }

          const totalWorkTime = attendance.checkOutTime
            ? (new Date(attendance.checkOutTime) - checkInTime) / 60000
            : 0;
          const actualPoint =
            (totalWorkTime > shiftWorkTime
              ? 1
              : totalWorkTime / shiftWorkTime) *
            (shiftType ? shiftType.point : 0);
          shiftDetail.totalWorkTime = totalWorkTime;
          shiftDetail.actualPoint = actualPoint;
        }

        dayAttendance.shifts.push(shiftDetail);

        if (attendance) {
          dayAttendance.attendedShifts.push(shiftDetail);
          dayAttendance.totalShiftWorkTime += shiftWorkTime;
          dayAttendance.totalWorkTime += shiftDetail.totalWorkTime;
          dayAttendance.totalPoint += shiftDetail.actualPoint;
        }
      }

      monthlyAttendance.push(dayAttendance);
    }

    return monthlyAttendance;
  },
  calculatePoint2: async (employeeId, timesheetId, month, year) => {
    const endOfMonth = new Date(year, month, 0, 23, 59, 59);
    const shifts = await Shift.find({ timeSheetId: timesheetId });
    const monthlyAttendance = [];

    for (let day = 1; day <= endOfMonth.getDate(); day++) {
      const currentDate = new Date(year, month - 1, day);
      const dayOfWeek = currentDate.getDay();

      const dayAttendance = {
        date: currentDate,
        attendances: [],
        isAbsense: false,
      };
      const attendance = await Attendance.find({
        employeeId,
        checkInTime: {
          $gte: new Date(year, month - 1, day),
          $lte: new Date(year, month - 1, day + 1),
        },
      }).populate({ path: "results.shiftId" });
      console.log(attendance);
      if (attendance.length == 0) {
        const dayShifts = shifts.filter(
          (shift) => shift.dayOfWeek === dayOfWeek
        );
        if (dayShifts.length > 0) {
          let result = [];
          for (const shift of dayShifts) {
            const shiftDetail = {
              shiftId: shift._id,
              attended: false,
              lateMinutes: 0,
              earlyLeaveMinutes: 0,
              actualPoint: 0,
            };
            result.push(shiftDetail);
          }
          const attendance = await Attendance.create({
            employeeId,
            timesheetId,
            date: currentDate,
            checkInTime: null,
            results: result,
          });
          await attendance.populate({ path: "results.shiftId" });
          dayAttendance.attendances = attendance;
          dayAttendance.isAbsense = true;
        }
      } else {
        dayAttendance.attendances = attendance;
      }
      monthlyAttendance.push(dayAttendance);
    }

    return monthlyAttendance;
  },
  checkOutAttendance2: async (attendanceId, checkOutTime) => {
    try {
      const attendance = await Attendance.findById(attendanceId);
      if (!attendance) throw new Error("Attendance not found");
      let result = [];
      const today = new Date(checkOutTime);
      const checkInTimeIndo = new Date(attendance.checkInTime);
      const checkOutTimeIndo = new Date(checkOutTime);
      attendance.checkOutTime = checkOutTime;
      console.log(checkInTimeIndo);
      console.log(checkOutTimeIndo);
      const shifts = await Shift.find({
        timeSheetId: attendance.timesheetId,
        dayOfWeek: today.getDay(),
      });
      console.log(shifts);
      for (const shift of shifts) {
        const shiftDetail = {
          shiftId: shift._id,
          attended: false,
          lateMinutes: 0,
          earlyLeaveMinutes: 0,
          actualPoint: 0,
        };

        const shiftStartTime = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          shift.startHour,
          shift.startMinute
        );
        const shiftEndTime = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          shift.endHour,
          shift.endMinute
        );
        console.log(shiftStartTime);
        console.log(shiftEndTime);
        if (
          checkInTimeIndo > shiftEndTime ||
          checkOutTimeIndo < shiftStartTime
        ) {
          shiftDetail.attended = false;
          console.log("go her");
        } else {
          if (checkInTimeIndo > shiftStartTime) {
            const lateMinutes = Math.floor(
              (checkInTimeIndo - shiftStartTime) / 60000
            );
            shiftDetail.lateMinutes = lateMinutes;
          }

          if (checkOutTimeIndo && checkOutTimeIndo < shiftEndTime) {
            const earlyLeaveMinutes = Math.floor(
              (shiftEndTime - checkOutTimeIndo) / 60000
            );
            console.log(earlyLeaveMinutes);
            shiftDetail.lateMinutes = earlyLeaveMinutes;
          }

          shiftDetail.attended = true;

          const shiftType = await ShiftType.findById(shift.shiftType);
          console.log(shiftType);
          shiftDetail.point = shiftType.point;
        }
        result.push(shiftDetail);
      }
      console.log(result);
      attendance.results = result;
      await attendance.save();
      return attendance;
    } catch (err) {
      throw new Error(err);
    }
  },
};
module.exports = attendanceService;
