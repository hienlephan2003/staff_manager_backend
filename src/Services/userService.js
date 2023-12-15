const User = require("../Models/User");
const userService = {
  createNewUser: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const password = CryptoJS.AES.encrypt(
          user.password,
          process.env.SECRET
        ).toString();
        user.password = password;
        const newUser = new User(user);
        const saveUser = await newUser.save();
        resolve(saveUser);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateUser: (userId, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateUser = await User.findByIdAndUpdate(
          userId,
          {
            $set: user,
          },
          { new: true }
        );
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = userService;
