const Router = require("express-promise-router");
const StripeController = require("../controllers/stripe.controller");
const router = new Router();
const controller = new StripeController();

router.post("/product", controller.createProduct);
router.post("/price", controller.createPrice);
router.get("/", controller.getSomething);
router.post("/checkout", controller.createCheckout);
router.post("/process-payment", controller.processPayment);

module.exports = router;
