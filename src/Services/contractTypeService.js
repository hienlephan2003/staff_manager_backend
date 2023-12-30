const ContractType = require("../Models/ContractType");
const contractTypeService = {
  createNewContractType: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const contractType = await ContractType.findOne(data);
        console.log(contractType);

        if (contractType == null) {
          const newContractType = new ContractType(data);
          const saveContractType = await newContractType.save();
          resolve(saveContractType);
        } else {
          console.log("exists");
          resolve("exists");
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  updateContractType: (contractTypeId, contractType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateContractType = await ContractType.findByIdAndUpdate(
          contractTypeId,
          {
            $set: contractType,
          },
          { new: true }
        );
        resolve(updateContractType);
      } catch (e) {
        reject(e);
      }
    });
  },
  getListContractType: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allContractType = await ContractType.find({}).exec();
        resolve(allContractType);
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = contractTypeService;
