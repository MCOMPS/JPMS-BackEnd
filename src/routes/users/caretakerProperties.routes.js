const Router = require('express-promise-router');
const router = new Router();

const CaretakerPropertiesController = require('../../controllers/caretakerProperties.controller');

module.exports = (modelPath) => {
    const controller = new CaretakerPropertiesController(modelPath);
    router.get('/', controller.getAllCaretakers);
    router.get('/:id', controller.getCaretakerInstance);
    router.post('/', controller.createCaretakerInstance);
    // router.patch('/:id', controller.updatePropertyInstance);
    // router.delete('/', controller.deleteProperty);

    return router;
}
