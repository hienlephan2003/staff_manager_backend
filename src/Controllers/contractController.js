const contractService = require("../Services/contractService");
const Contract = require("../Models/Contract");
const contractController = {
  addContract: async (req, res) => {
    try {
      const newContract = await contractService.createNewContract(req.body);
      return res.status(200).json(newContract);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateContract: async (req, res) => {
    try {
      const updateContract = await contractService.updateContract(
        req.body.id,
        req.body.event
      );
      res.status(200).json(updateContract);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteContract: async (req, res) => {
    try {
      await Contract.findByIdAndDelete(req.params.id);
      res.status(200).json("Contract successfully deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = contractController;
