const Contract = require("../Models/Contract");
const contractService = {
  createNewContract: (contract) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newAddress = new Address(contract.address);
        contract.addressId = newAddress._id;
        const newContract = new Contract(contract);
        newAddress.save();
        const saveContract = await newContract.save();
        resolve(saveContract);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateContract: (contractId, contract) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateContract = await Contract.findByIdAndUpdate(
          contractId,
          {
            $set: contract,
          },
          { new: true }
        );
        resolve(updateContract);
      } catch (e) {
        reject(e);
      }
    });
  },
  getListContract: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allContract = await Contract.find({})
          .limit(10)
          .sort({ startAt: 1 })
          .exec();
        resolve(allContract);
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = contractService;
