const Router = require("express-promise-router");
const router = new Router();
const InvoicesController = require("../../controllers/invoices.controller");

// Endpoint: {{base_url}}/invoices

module.exports = (modelPath) => {
    const controller = new InvoicesController(modelPath);
    router.get("/", controller.getAllInvoices);
    router.get("/:id", controller.getAnInvoice);
    router.post("/", controller.addAnInvoice);
    router.put('/', controller.updateAnInvoice);
    // router.delete("/", controller.archiveInvoice);
    return router;
}