const scratch = require("./scratch.routes");
const properties = require("./main/properties.routes");
const expenses = require("./main/expenses.routes");
const rooms = require("./main/rooms.routes");
const tenants = require("./main/tenants.routes");
const contracts = require("./main/contracts.routes");
const invoices = require("./main/invoices.routes");
const customers = require("./main/customers.routes");
const caretakerProperties = require("./users/caretakerProperties.routes")
const auth = require("./users/auth.routes");

module.exports = (app, modelMode) => {
  let modelPath;
  if (modelMode === "default") {
    modelPath = "../models";
  } else if (modelMode === "mock") {
    modelPath = "../models-mock";
  }

  app.use("/scratch", scratch(modelPath));
  app.use("/properties", properties(modelPath));
  app.use("/properties/expenses", expenses(modelPath));
  app.use("/properties/rooms", rooms(modelPath));
  app.use("/tenants", tenants(modelPath));
  app.use("/contracts", contracts(modelPath));
  app.use("/invoices", invoices(modelPath));
  app.use("/customers", customers(modelPath));
  app.use("/caretaker_properties", caretakerProperties(modelPath));
  app.use("/auth", auth(modelPath));
};
