const employeeRouter = require("./employee.js");
const userRouter = require("./user.js");
const imageRouter = require("./image.js");
const Routes = (app) => {
  app.use("/api/employee", employeeRouter);
  app.use("/api/user", userRouter);
  app.use("/api/image", imageRouter);
};
module.exports = Routes;
