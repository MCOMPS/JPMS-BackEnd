class OnboardingController {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/tenantOnboarding/onboarding.model`);
  }

  makeNewTenant = async (req, res, next) => {
    try {
      const tenant = req.body;
      const result = await this.model.makeNewTenant(tenant);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }; // end of makeNewTenant


}; 

module.exports = OnboardingController;