class Payments {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/main/payments.model`);
  }

  getAllPayments = async (req, res, next) => {
    try {
      // Check if payment IDs are specified in the query
      const paymentIds = req.query.id;

      if (paymentIds) {
        // Convert paymentIds to an array if it's a single value
        const idArray = Array.isArray(paymentIds) ? paymentIds : [paymentIds];

        // Fetch payments for the specified IDs
        const payments = await Promise.all(
          idArray.map(async (id) => {
            const result = await this.model.getPaymentInstance(id);

            if (result instanceof Error) {
              // Handle errors for individual payment requests
              throw new Error(
                `Error getting payment with ID ${id}: ${result.message}`
              );
            }

            // Return the payment if it exists, or null otherwise
            return result.rows.length > 0 ? result.rows[0] : null;
          })
        );

        return res.status(200).json(payments);
      }

      // If no specific payment IDs are requested, get all payments
      const { _start, _end } = req.query;
      const start = parseInt(_start) || 0;
      const end = parseInt(_end) || Infinity;

      const allPayments = await this.model.getAllPayments();

      if (allPayments instanceof Error) {
        // Handle errors for fetching all payments
        throw new Error(`Error getting all payments: ${allPayments.message}`);
      }

      // Apply pagination
      const paginatedPayments = allPayments.rows.slice(start, end);

      // Return paginated payments
      res.status(200).json(paginatedPayments);
    } catch (error) {
      next(error);
    }
  }; // end of getAllPayments

  getPaymentInstance = async (req, res, next) => {
    try {
      // Get the payment ID from the request parameters
      const { id } = req.params;
      // Fetch the payment
      const payment = await this.model.getPaymentInstance(id);

      // If the payment doesn't exist, throw an error
      if (payment.rows.length === 0) {
        throw new Error(`Payment with ID ${id} does not exist`);
      }

      // Otherwise, return the payment
      res.status(200).json(payment.rows[0]);
    } catch (error) {
      next(error);
    }
  }; // end of getPaymentInstance
} // end of Payments class


module.exports = Payments;