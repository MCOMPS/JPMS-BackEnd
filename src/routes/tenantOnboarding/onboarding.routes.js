const Router = require('express-promise-router');
const router = new Router();

const OnboardingController = require('../../controllers/onboarding.controller');

module.exports = (modelPath)  => {
    const controller = new OnboardingController(modelPath);

    router.post('/', controller.onboardNewTenant);

    return router;
}