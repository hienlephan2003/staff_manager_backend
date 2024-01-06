const router = require("express").Router();
const { createPoints, addPoint } = require("../Controllers/pointController.js");

router.get("/", createPoints);
router.post("/", addPoint);
module.exports = router;
