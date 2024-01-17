// const axios = require('axios/dist/node/axios.cjs');
const axios = require("axios");

const URL = "http://localhost:3000";

class OnboardingController {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/tenantOnboarding/onboarding.model`);
  }

  testGetFromStripeEndpoint = async (req, res, next) => {
    await axios.get(`${URL}/stripe`).then(
      (response) => {
        console.log("from onboarding", response.data);
        res.status(200).json(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
    res.status(500).json({
      message: "FAILED",
    });
  };

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

      let product_id = "";
      await axios.post(`${URL}/stripe/product`, {name: tenant.ic_no}).then(response => {
        console.log("from onboardNewTenat, product id: ", response.data.id)
        product_id = response.data.id;
      });
      const makeContract = await this.model.makeInitialContract(
        contract,
        product_id,
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
