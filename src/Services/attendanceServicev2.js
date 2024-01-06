const Attendance = require("../Models/Attendance");
const EmployeeTimesheet = require("../Models/EmployeeTimesheet");
const Point = require("../Models/Point");
const Shift = require("../Models/Shift");
const ShiftType = require("../Models/ShiftType");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
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
  getPoint: async (employeeId, month, year) => {
    return new Promise(async (res, rej) => {
      try {
        const firstDayOfMonth = new Date(year, month - 1, 1); // Get the first day of the specified month
        const lastDayOfMonth = new Date(year, month, 0); // Get the last day of the specified month
        console.log(firstDayOfMonth, lastDayOfMonth);
        // console.log(employeeId);
        const points = await Point.aggregate([
          {
            $match: {
              employeeId: new ObjectId(employeeId._id),
              date: {
                $gte: firstDayOfMonth,
                $lt: lastDayOfMonth,
              },
            },
          },
          {
            $lookup: {
              from: "shifts",
              localField: "shiftId",
              foreignField: "_id",
              as: "shiftId", // Create a new field 'shiftData' to store the populated shift details
            },
          },
          {
            $addFields: {
              shiftId: { $arrayElemAt: ["$shiftId", 0] }, // Keep only the first shift
            },
          },

          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              date: { $first: "$date" },
              totalPoint: { $sum: "$point" },
              totalLate: { $sum: "$lateMinutes" },
              totalSoon: { $sum: "$soonMinutes" },
              points: { $addToSet: "$$ROOT" }, // Preserve existing fields in the 'points' array
            },
          },
          // {
          //   $unwind: "$points", // Unwind the 'points' array to prepare for the $lookup stage
          // },
          // {
          //   $group: {
          //     _id: "$_id",
          //     totalPoint: { $first: "$totalPoint" },
          //     totalLate: { $first: "$totalLate" },
          //     totalSoon: { $first: "$totalSoon" },
          //     points: { $push: "$points" }, // Push back the 'points' array with populated 'shiftData'
          //   },
          // },
        ]);
        console.log(points);
        res(points);
      } catch (error) {
        console.error(error);
        rej(error);
      }
    });
  },
  getAllPoint: async (month, year) => {
    return new Promise(async (res, rej) => {
      try {
        const firstDayOfMonth = new Date(year, month - 1, 1); // Get the first day of the specified month
        const lastDayOfMonth = new Date(year, month, 0); // Get the last day of the specified month
        console.log(firstDayOfMonth, lastDayOfMonth);
        // console.log(employeeId);
        // const points = await Point.aggregate([
        //   {
        //     $match: {
        //       date: {
        //         $gte: firstDayOfMonth,
        //         $lt: lastDayOfMonth,
        //       },
        //     },
        //   },
        //   // {
        //   //   $lookup: {
        //   //     from: "shifts",
        //   //     localField: "shiftId",
        //   //     foreignField: "_id",
        //   //     as: "shiftId", // Create a new field 'shiftData' to store the populated shift details
        //   //   },
        //   // },
        //   // {
        //   //   $addFields: {
        //   //     shiftId: { $arrayElemAt: ["$shiftId", 0] }, // Keep only the first shift
        //   //   },
        //   // },

        //   {
        //     $group: {
        //       _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        //       date: { $first: "$date" },
        //       points: { $addToSet: "$$ROOT" },
        //     },
        //   },
        // ]);
        const points = await Point.aggregate([
          {
            $match: {
              date: {
                $gte: firstDayOfMonth,
                $lt: lastDayOfMonth,
              },
            },
          },
          {
            $group: {
              _id: "$employeeId",
              // date: { $first: "$date" },

              points: { $addToSet: "$$ROOT" },
            },
          },
          {
            $lookup: {
              from: "employees",
              localField: "_id",
              foreignField: "_id",
              as: "employee",
            },
          },
          {
            $addFields: {
              employee: { $arrayElemAt: ["$employee", 0] },
            },
          },
          {
            $project: {
              points: "$points",
              employeeName: "$employee.fullName",
            },
          },
        ]);
        const formatPoints = points.map((employee) => {
          const obj = { employeeName: employee.employeeName };

          // Populate all days initially with an empty array
          for (let i = 1; i <= 31; i++) {
            obj[`day_${i}`] = [];
          }

          employee.points.forEach((point) => {
            const dayKey = `day_${new Date(point.date).getDate()}`;
            obj[dayKey].push({ id: point._id, point: point.point });
          });

          return obj;
        });
        res(formatPoints);
      } catch (error) {
        console.error(error);
        rej(error);
      }
    });
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
  updateAttendanceAndCreatePoints: async (attendanceId, checkOutTime) => {
    return new Promise(async (res, rej) => {
      try {
        const updatedAttendance = await Attendance.findByIdAndUpdate(
          attendanceId,
          { checkOutTime: checkOutTime },
          { new: true }
        );
        console.log("ee");
        if (!updatedAttendance) {
          throw new Error("Attendance not found");
        }

        const checkInTime = new Date(updatedAttendance.checkInTime);
        const employeeId = updatedAttendance.employeeId;
        const emti = await EmployeeTimesheet.findOne({ employeeId }).populate(
          "timesheetId"
        );
        // Get today's date
        const today = new Date();
        const shifts = await Shift.aggregate([
          {
            $match: {
              timeSheetId: emti.timesheetId._id,
              $expr: {
                $or: [
                  { $eq: ["$date", today] },
                  { $eq: ["$dayOfWeek", today.getDay()] },
                ],
              },
            },
          },
        ]);
        console.log(shifts);
        const pointsPromises = shifts.map(async (shift) => {
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

          const shiftDetail = {
            employeeId,
            shiftId: shift._id,
            date: shiftStartTime,
            attended: false,
            point: 0,
            lateMinutes: 0,
            soonMinutes: 0,
          };

          if (checkInTime > shiftEndTime || checkOutTime < shiftStartTime) {
            console.log("Employee did not attend this shift");
          } else {
            if (checkInTime > shiftStartTime) {
              const lateMinutes = Math.floor(
                (checkInTime - shiftStartTime) / 60000
              );
              shiftDetail.lateMinutes = lateMinutes;
            }

            if (checkOutTime && checkOutTime < shiftEndTime) {
              const soonMinutes = Math.floor(
                (shiftEndTime - checkOutTime) / 60000
              );
              shiftDetail.soonMinutes = soonMinutes;
            }

            shiftDetail.attended = true;

            const shiftType = await ShiftType.findById(shift.shiftType);
            if (shiftType) {
              shiftDetail.point = shiftType.point;
            }
          }

          const newPoint = new Point(shiftDetail);
          return newPoint.save();
        });

        const createdPoints = await Promise.all(pointsPromises);

        res({
          updatedAttendance: updatedAttendance,
          createdPoints: createdPoints,
        });
      } catch (error) {
        console.error(error);
        rej(error);
      }
    });
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
