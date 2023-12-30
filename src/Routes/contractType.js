const router = require("express").Router();
const {
  addContractType,
  updateContractType,
  deleteContractType,
  getContractTypes,
} = require("../Controllers/contractTypeController.js");

router.post("/newContractType", addContractType);
router.post("/updateContractType", updateContractType);
router.delete("/deleteContractType/:id", deleteContractType);
router.get("/", getContractTypes);
module.exports = router;
