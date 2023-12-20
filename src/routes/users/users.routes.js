const Router = require('express-promise-router');
const router = new Router();

const UsersController = require('../../controllers/users.controller');

module.exports = (modelPath)  => {
    const controller = new UsersController(modelPath);
    router.get('/', controller.getAllUsers);
    router.get('/:idORemail', controller.getUser);
    // router.post('/', controller.createPropertyInstance);
    // router.patch('/:id', controller.updatePropertyInstance);
    // router.delete('/', controller.deleteProperty);

    return router;
}