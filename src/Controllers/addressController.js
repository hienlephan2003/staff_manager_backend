const Address = require("../Models/Address");
const addressController = {
  getAddress: async (req, res) => {
    try {
      const address = await Address.findById(req.params.id);
      res.status(200).json(address);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
export default addressController;
