const Router = require("express-promise-router");
const router = new Router();
const PaymentsController = require("../../controllers/payments.controller");

// Endpoint: {{base_url}}/payments

module.exports = (modelPath) => {
    const controller = new PaymentsController(modelPath);
    router.get("/", controller.getAllPayments);
    router.get("/:id", controller.getPaymentInstance);
    return router;
}