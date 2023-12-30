const degreeService = require("../Services/degreeService");
const Degree = require("../Models/Degree");
const degreeController = {
  addDegree: async (req, res) => {
    try {
      const newDegree = await degreeService.createNewDegree(req.body);
      return res.status(200).json(newDegree);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateDegree: async (req, res) => {
    try {
      const updateDegree = await degreeService.updateDegree(
        req.body.id,
        req.body
      );
      res.status(200).json(updateDegree);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteDegree: async (req, res) => {
    try {
      await Degree.findByIdAndDelete(req.params.id);
      res.status(200).json("Degree successfully deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getDegrees: async (req, res) => {
    try {
      const degrees = await Degree.find();
      res.status(200).json(degrees);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = degreeController;
