const contractTypeService = require("../Services/contractTypeService");
const ContractType = require("../Models/ContractType");
const contractTypeController = {
  addContractType: async (req, res) => {
    try {
      const newContractType = await contractTypeService.createNewContractType(
        req.body
      );
      if (newContractType == "exists") {
        return res.status(400).json("Tên không được trùng");
      } else return res.status(200).json(newContractType);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  updateContractType: async (req, res) => {
    try {
      const updateContractType = await contractTypeService.updateContractType(
        req.body.id,
        req.body
      );
      res.status(200).json(updateContractType);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteContractType: async (req, res) => {
    try {
      await ContractType.findByIdAndDelete(req.params.id);
      res.status(200).json("ContractType successfully deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getContractTypes: async (req, res) => {
    try {
      const contractTypes = await ContractType.find();
      res.status(200).json(contractTypes);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = contractTypeController;
