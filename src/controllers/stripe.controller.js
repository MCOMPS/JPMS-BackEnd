const stripe = require("stripe")(process.env.TEST_KEY);

class StripeController {
  getSomething = (req, res, next) => {
    res.status(200).json({
      message: "GET request to /stripe",
    });
  };

  createProduct = async (req, res, next) => {
    try {
      const product = req.body;

      const productRes = await stripe.products.create(product);

      // const { id: productId } = product;

      res.status(200).json({
        productRes,
      });
    } catch (error) {
      next(error);
    }
  };

  createPrice = async (req, res, next) => {
    try {
      const { productId } = req.body;
      const price = await stripe.prices.create({
        currency: "MYR",
        unit_amount: 100000,
        product: productId,
      });

      const { id: priceId } = price;

      res.status(200).json({
        priceId: priceId,
      });
    } catch (error) {
      next(error);
    }
  };

  createCheckout = async (req, res, next) => {
    const CUSTOMER_CLIENT_URL = process.env.CUSTOMER_CLIENT_URL;

    const { property_id } = req.params;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1OTB9oCp3Bh7LH9hS97ufTzr",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${CUSTOMER_CLIENT_URL}/paymentSuccess/${property_id}`,
      cancel_url: `${CUSTOMER_CLIENT_URL}/paymentCanceled`,
    });

    console.log("Checkout session created:", session.id);

    res.status(303).redirect(session.url);
  };

  processPayment = async (req, res, next) => {
    const { sessionID } = req.body;

    // Perform actions on the server based on the successful checkout session
    console.log("Received session ID from frontend:", sessionID);

    // You can perform additional actions (e.g., update your database, send email, etc.)

    const session = await stripe.checkout.sessions.retrieve(sessionID);

    console.log("Retrieved session:", session);

    // session.payment_intent is the ID of the completed payment.

    res.status(200).json({ success: true });
  };
}
module.exports = StripeController;
