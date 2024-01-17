const Router = require("express-promise-router");
const router = new Router();

// Import checkJwt from the middleware file
const checkJwt = require("../../middlewares/jwtCheck");

const MyContractsController = require("../../controllers/myContracts.controller");

module.exports = (modelPath) => {
  const controller = new MyContractsController(modelPath);

  router.get("/", controller.getMyContracts);
  router.post("/", controller.makeContractAfterpayment);

  return router;
};
