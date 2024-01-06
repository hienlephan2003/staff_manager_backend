const router = require("express").Router();
const { add } = require("../Controllers/employeeTimesheetController.js");
const verifyToken = require("../MiddleWares/verifyToken.js");
router.post("/", verifyToken, add);
module.exports = router;
