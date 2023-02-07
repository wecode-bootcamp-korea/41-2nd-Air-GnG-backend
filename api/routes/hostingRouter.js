const express = require('express');
const upload = require('../util/upload');

const hostingController = require('../controllers/hostingController');
const { validationToken } = require('../util/auth');

const router = express.Router();

router.get('/', validationToken, hostingController.hostingRooms);
router.post('/enrollment', validationToken, upload, hostingController.createHost);

module.exports = {
  router,
};
