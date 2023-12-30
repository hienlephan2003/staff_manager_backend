const router = require("express").Router();
const {
  addDegree,
  updateDegree,
  deleteDegree,
  getDegrees,
} = require("../Controllers/degreeController.js");

router.post("/newDegree", addDegree);
router.post("/updateDegree", updateDegree);
router.delete("/deleteDegree/:id", deleteDegree);
router.get("/", getDegrees);
module.exports = router;
