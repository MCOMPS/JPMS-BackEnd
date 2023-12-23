const Router = require('express-promise-router');
const router = new Router();

const AuthController = require('../../controllers/auth.controller');

module.exports = (modelPath) => {
    const controller = new AuthController(modelPath);
    router.post('/login', controller.login);
    router.delete('/logout', controller.logout);
    router.patch('/check', controller.check);
    router.post('/register', controller.register);
    return router;
}
