const router = require("express").Router();
const { createSalary } = require("../Controllers/salaryController.js");

router.get("/", createSalary);
module.exports = router;
