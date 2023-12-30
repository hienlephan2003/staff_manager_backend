const ShiftType = require("../Models/ShiftType");
const timesheetService = require("../Services/timeSheetService");

const timeSheetController = {
  getShiftTypes: async (req, res) => {
    try {
      const shifts = await ShiftType.find();
      res.status(200).json(shifts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addShiftType: async (req, res) => {
    try {
      const shift = await ShiftType.create(req.body);
      res.status(200).json(shift);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addTimeSheet: async (req, res) => {
    try {
      console.log(req.body);
      timesheetService
        .createNewTimeSheet(req.body)
        .then((timesheet) =>
          timesheetService
            .createShifts(req.body.shifts, timesheet._id)
            .then((shifts) => res.status(200).json({ timesheet, shifts }))
            .catch((err) => {
              console.log(err);
              throw Error(err);
            })
        )
        .catch((error) => {
          console.log(error);
          throw Error(error);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = timeSheetController;
