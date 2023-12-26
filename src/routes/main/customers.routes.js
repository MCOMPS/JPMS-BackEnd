const Router = require("express-promise-router");
const router = new Router();

const CustomersController = require("../../controllers/customers.controller");

module.exports = (modelPath) => {
  const controller = new CustomersController(modelPath);
  router.get("/", controller.getAllCustomers);
  router.get("/:id", controller.getCustomer);
  router.post("/", controller.createCustomer);
  router.put("/", controller.updateCustomer);
  router.delete("/", controller.deleteCustomer);

  return router;
};
