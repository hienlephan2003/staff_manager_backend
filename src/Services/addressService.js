const Address = require("../Models/Address");

const addressService = {
  createNewAddress: (address) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newAddress = new Address(address);
        const saveAddress = await newAddress.save();
      } catch (e) {
        reject(e);
      }
    });
  },
};
module.exports = addressService;
