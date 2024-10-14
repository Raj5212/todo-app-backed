module.exports = function (app) {


  const user = require("./users");
  const task = require("./tasks")


// -----------------------------------------------------------------------------------
  app.use("/api/v1/user", user);
  app.use("/api/v1/user", task);
};