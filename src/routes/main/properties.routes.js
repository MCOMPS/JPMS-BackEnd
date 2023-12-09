const Router = require('express-promise-router');
const router = new Router();

const PropertiesController = require('../../controllers/properties.controller');

module.exports = (modelPath)  => {
    const controller = new PropertiesController(modelPath);
    router.get('/', controller.getAllProperties);
    router.get('/:property_id', controller.getProperty);
    router.post('/', controller.createPropertyInstance);
    router.put('/', controller.updatePropertyInstance);
    router.delete('/', controller.deleteProperty);

    return router;
}