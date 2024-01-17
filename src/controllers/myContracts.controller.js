class MyContractsController {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/client/myContracts.model`);
  }

  getMyContracts = async (req, res, next) => {
    try {
      const { auth0_id } = req.query;

      const result = await this.model.getMyContracts(auth0_id);
      if (result instanceof Error) {
        throw new Error(`Error getting all my contracts: ${result.message}`);
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }; // end of getMyContracts

  makeContractAfterpayment = async (req, res, next) => {
    try {
      const { auth0_id, property_id } = req.body;

      const result = await this.model.makeContractAfterpayment(
        auth0_id,
        property_id
      );
      if (result instanceof Error) {
        throw new Error(`Error making new contract: ${result.message}`);
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }; // end of makeContractAfterpayment
} // end of class MyContractsController

module.exports = MyContractsController;
