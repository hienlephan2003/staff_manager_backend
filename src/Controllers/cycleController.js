const cycleService = require("../Services/cycleService");
const Cycle = require("../Models/Cycle");
const cycleController = {
  addCycle: async (req, res) => {
    try {
      const newCycle = await cycleService.createNewCycle(req.body);
      return res.status(200).json(newCycle);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateCycle: async (req, res) => {
    try {
      const updateCycle = await cycleService.updateCycle(req.body.id, req.body);
      res.status(200).json(updateCycle);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteCycle: async (req, res) => {
    try {
      await Cycle.findByIdAndDelete(req.params.id);
      res.status(200).json("Cycle successfully deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getCycles: async (req, res) => {
    try {
      const cycles = await Cycle.find();
      res.status(200).json(cycles);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = cycleController;
