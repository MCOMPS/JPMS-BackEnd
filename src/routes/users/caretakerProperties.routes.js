const Router = require('express-promise-router');
const router = new Router();

const CaretakerPropertiesController = require('../../controllers/caretakerProperties.controller');

module.exports = (modelPath) => {
    const controller = new CaretakerPropertiesController(modelPath);
    // router.get('/', controller.getAllCaretakers);
    router.get('/', controller.joinCaretakerProperties);
    // router.get('/:id', controller.getCaretakerInstance);
    router.get('/:id', controller.getJoinedCaretakerPropertiesInstance);
    router.get('/:id/properties', controller.getPropertiesByCaretakerId);
    router.post('/', controller.createCaretakerInstance);
    router.patch('/:id', controller.updateCaretakerInstance);
    // router.delete('/', controller.deleteProperty);

    return router;
}
