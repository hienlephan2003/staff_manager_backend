const router = require("express").Router();
const {
  addCycle,
  updateCycle,
  deleteCycle,
  getCycles,
} = require("../Controllers/cycleController.js");

router.post("/newCycle", addCycle);
router.post("/updateCycle", updateCycle);
router.delete("/deleteCycle/:id", deleteCycle);
router.get("/", getCycles);
module.exports = router;
