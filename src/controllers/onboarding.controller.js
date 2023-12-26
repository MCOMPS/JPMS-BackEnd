class OnboardingController {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/tenantOnboarding/onboarding.model`);
  }

  onboardNewTenant = async (req, res, next) => {
    try {
      const { tenant, payment, contract } = req.body;
      const makeTenant = await this.model.makeNewTenant(tenant);
      if (makeTenant instanceof Error) throw Error("Error making tenant");

      const makePayment = await this.model.makePayment(
        payment,
        makeTenant.rows[0].id
      );
      if (makePayment instanceof Error) throw Error("Error making payment");

      const makeContract = await this.model.makeInitialContract(
        contract,
        makeTenant.rows[0].id
      );
      if (makeContract instanceof Error) throw Error("Error making contract");

      const invoice = {
        invoice_date: new Date(),
        amount: contract.rent,
        amount_paid: payment.amount,
      };
      const makeInvoice = await this.model.generateInvoice(
        makeContract.rows[0].id,
        makeTenant.rows[0].id,
        invoice
      );
      if (makeInvoice instanceof Error) throw Error("Error making invoice");

      const result = {
        tenant: makeTenant.rows[0],
        payment: makePayment.rows[0],
        contract: makeContract.rows[0],
        invoice: makeInvoice.rows[0],
      };
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }; // end of makeNewTenant
}

module.exports = OnboardingController;
