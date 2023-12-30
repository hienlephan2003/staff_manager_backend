const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "staffmanager", async (err, user) => {
      if (err) return res.status(403).json("Invalid token");
      req.body.user = user;
      //   console.log(user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

module.exports = verifyToken;
