const router = require("express").Router();
const {
  addMoneyType,
  updateMoneyType,
  deleteMoneyType,
  getMoneyTypes,
} = require("../Controllers/moneyTypeController.js");

router.post("/newMoneyType", addMoneyType);
router.post("/updateMoneyType", updateMoneyType);
router.delete("/deleteMoneyType/:id", deleteMoneyType);
router.get("/", getMoneyTypes);
module.exports = router;
