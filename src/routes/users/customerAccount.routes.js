const Router = require("express-promise-router");
const router = new Router();

const CustomerAccountController = require("../../controllers/customerAccount.controller");

module.exports = (modelPath) => {
  const controller = new CustomerAccountController(modelPath);
  router.get("/", controller.getSomething);
  router.post("/new", controller.makeNewCustomer);
  router.get("/getall", controller.getAllCustomers);

  return router;
};
