const express = require('express');

const roomController = require('../controllers/roomController');

const router = express.Router();

router.get('/', roomController.getRooms);

router.get('/:roomId', roomController.getRoomByDetail);

module.exports = {
  router,
};
