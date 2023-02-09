const express = require('express');

const roomController = require('../controllers/roomController');
const { validationToken } = require('../util/auth');

const router = express.Router();

router.get('/wishList', validationToken, roomController.getMyWishList);
router.post('/wishList', validationToken, roomController.addRoomToWishList);
router.delete('/wishList', validationToken, roomController.deleteWishList);

router.get('/', roomController.getRooms);

router.get('/:roomId', roomController.getRoomByDetail);

module.exports = {
  router,
};
