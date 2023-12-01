const Router = require('express-promise-router');
const ScratchController = require('../controllers/scratch.controller');
const router = new Router();

module.exports = (modelPath)  => {
    const controller = new ScratchController(modelPath);
    router.get('/', controller.printHello);
    router.get('/generateId', controller.generateId);
    router.get('/apartments', controller.getApartments);
    router.get('/tenants', controller.getAllTenants);
    router.post("/apartment", controller.createApartment)
    return router;
}
