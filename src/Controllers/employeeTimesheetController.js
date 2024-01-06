const ShiftType = require("../Models/ShiftType");
const EmployeeTimesheet = require("../Models/EmployeeTimesheet");
const timesheetService = require("../Services/timeSheetService");
const Shift = require("../Models/Shift");
const employeeTimesheetController = {
  add: async (req, res) => {
    try {
      const doc = await EmployeeTimesheet.updateOne(
        { employeeId: req.body.user.employeeId },
        {
          employeeId: req.body.user.employeeId,
          timesheetId: req.body.timesheetId,
        },
        { upsert: true }
      );
      res.status(200).json(doc);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
module.exports = employeeTimesheetController;
