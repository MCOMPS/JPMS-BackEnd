class CustomerAccountController {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/users/customerAccount.model`);
  }

  getSomething = async (req, res, next) => {
    res.status(200).json({
      message: "GET request to /customerAccount",
    });
  }; // end of getSomething

  getAllCustomers = async (req, res, next) => {
    try {
      const result = await this.model.getAllCustomers();
      if (result instanceof Error) {
        throw new Error(`Error getting all customers: ${result.message}`);
      }
      res.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  }; // end of getAllCustomers

  makeNewCustomer = async (req, res, next) => {
    try {
      const user = req.body;

      console.log("user", user);
      const result = await this.model.makeNewCustomer(user);
      if (result instanceof Error) {
        throw new Error(`Error making new customer: ${result.message}`);
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }; // end of makeNewCustomer
}

module.exports = CustomerAccountController;
