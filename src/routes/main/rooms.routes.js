const Router = require('express-promise-router');
const router = new Router();

const RoomsController = require('../../controllers/rooms.controller');

module.exports = (modelPath) => {
    const controller = new RoomsController(modelPath);
    router.get('/', controller.getAllRooms);
    router.post('/', controller.addRoom);
    router.put('/', controller.updateRoom);
    router.delete('/', controller.deleteRoom);

    return router;
}