class CustomersController {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/main/customers.model`);
  }

  getAllCustomers = async (req, res, next) => {
    try {
      // check if customer ids are specified in the query
      const customerIds = req.query.customer_id;

      if (customerIds) {
        // convert customerIds to an array if it's a single value
        const idArray = Array.isArray(customerIds)
          ? customerIds
          : [customerIds];

        // fetch customers for the specified ids
        const customers = await Promise.all(
          idArray.map(async (id) => {
            const result = await this.model.getCustomer(id);
            if (result instanceof Error) {
              // handle errors for individual customer requests
              throw new Error(
                `Error getting customer with id ${id}: ${result.message}`
              );
            }
            // return the customer if it exists, or null otherwise
            return result.rows.length > 0 ? result.rows[0] : null;
          })
        );

        return res.status(200).json(customers);
      }

      // if no specific customer ids are requested, get all customers
      const { _start, _end } = req.query;
      const start = parseInt(_start) || 0;
      const end = parseInt(_end) || Infinity;

      const allCustomers = await this.model.getAllCustomers();
      if (allCustomers instanceof Error) {
        // handle errors for fetching all customers
        throw new Error(`Error getting all customers: ${allCustomers.message}`);
      }

      // return the requested customers
      return res.status(200).json(allCustomers.rows.slice(start, end));
    } catch (error) {
      next(error);
    }
  }; // end of getAllCustomers

  getCustomer = async (req, res, next) => {
    try {
      // get the customer id from the request params
      const { id } = req.params;

      // query the database
      const result = await this.model.getCustomer(id);

      // if the database returns an error, throw an error
      if (result instanceof Error)
        throw new Error(`Error getting customer ${result.message}`);

      // else, return the customer
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }; // end of getCustomer()

  // getAllCustomers = async (req, res, next) => {
  //   try {
  //     // get a customer record given customer_id
  //     if (req.query.customer_id) {
  //       const result = await this.model.getCustomer(req.query.customer_id);

  //       if (result instanceof Error)
  //         throw new Error(`Error getting customer: ${result.message}`);

  //       return res.status(200).json(result.rows[0]);
  //     }

  //     // 1. query the database
  //     const result = await this.model.getAllCustomers();

  //     // 2. if the database returns an error, throw an error
  //     if (result instanceof Error) {
  //       throw new Error(`Error getting Customer ${result.message}`);
  //     }

  //     // 3. else, return the Customer
  //     return res.status(200).json(result.rows);
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }; // end of getAllCustomers()

  createCustomer = async (req, res, next) => {
    try {
      // 1. get the customer from the request body
      const customer = req.body;

      const isObjectNotEmpty = (obj) => {
        return Object.keys(obj).length !== 0;
      };

      // 2. validate the customer object
      if (!isObjectNotEmpty(customer))
        throw new Error(`The Customer object is empty`);

      // 3. query the database
      const result = await this.model.addCustomer(customer);

      res.status(201).json({
        message: "Customer created successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }; // end of createCustomer

  updateCustomer = async (req, res, next) => {
    try {
      const customer_id = req.query.customer_id;
      const updates = req.body;

      // if updates object is empty, throw an error
      if (Object.keys(updates).length === 0)
        throw new Error(`The updates object empty`);

      // 1. query the database
      const result = await this.model.updateCustomer(customer_id, updates);

      if (result instanceof Error)
        throw new Error(
          `Error updating customer with id ${customer_id} with message: ${result.message}`
        );

      // return the result
      res.status(200).json({
        message: `Customer with id ${customer_id} updated successfully`,
        result: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCustomer = async (req, res, next) => {
    try {
      const customer_id = req.query.customer_id;

      const result = await this.model.deleteCustomer(customer_id);

      res.status(200).json({
        message: `customer with id ${customer_id} deleted successfully`,
        customerData: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }; // end of deleteCustomer
} // end of CustomersController

module.exports = CustomersController;
