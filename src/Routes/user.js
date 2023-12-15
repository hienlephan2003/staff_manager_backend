const router = require("express").Router();
const userController = require("../Controllers/userController");
router.post("/login", userController.loginUser);
router.post("/addUser", userController.addUser);
router.post("/updateUser", userController.updateUser);
modules.export = router;
