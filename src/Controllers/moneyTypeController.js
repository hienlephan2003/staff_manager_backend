const moneyTypeService = require("../Services/moneyTypeService");
const MoneyType = require("../Models/MoneyType");
const moneyTypeController = {
  addMoneyType: async (req, res) => {
    try {
      const newMoneyType = await moneyTypeService.createNewMoneyType(req.body);
      return res.status(200).json(newMoneyType);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateMoneyType: async (req, res) => {
    try {
      const updateMoneyType = await moneyTypeService.updateMoneyType(
        req.body.id,
        req.body
      );
      res.status(200).json(updateMoneyType);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteMoneyType: async (req, res) => {
    try {
      await MoneyType.findByIdAndDelete(req.params.id);
      res.status(200).json("MoneyType successfully deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getMoneyTypes: async (req, res) => {
    try {
      const moneyTypes = await MoneyType.find();
      res.status(200).json(moneyTypes);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = moneyTypeController;
