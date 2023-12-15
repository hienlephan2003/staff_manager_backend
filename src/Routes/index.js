const employeeRouter = require("./employee.js");
const Routes = (app) => {
  app.use("/api/employee", employeeRouter);
  // app.use("/api/user", userRouter);
};
module.exports = Routes;
