const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const userService = require("../Services/userService");
const User = require("../Models/User");
const userController = {
  addUser: async (req, res) => {
    try {
      const newUser = await userService.createNewUser(req.body.user);
      return res.status(200).json(newUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const updateUser = await userService.updateUser(
        req.body.id,
        req.body.event
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    try {
      console.log(req.body);
      const user = await User.findOne({ email: req.body.email }).populate(
        "employeeId"
      );

      if (!user) {
        return res.status(401).json("Wrong Login Details");
      }

      const descryptedPass = CryptoJS.AES.decrypt(
        user?.password,
        "staffmanager"
      );
      const depassword = descryptedPass.toString(CryptoJS.enc.Utf8);

      if (depassword !== req.body.password)
        return res.status(401).json("Wrong password");

      const userToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
          employeeId: user.employeeId,
        },
        "staffmanager",
        { expiresIn: "21d" }
      );
      const userObj = user.toObject();
      return res.status(200).json({ ...userObj, userToken });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  },
};

module.exports = userController;
