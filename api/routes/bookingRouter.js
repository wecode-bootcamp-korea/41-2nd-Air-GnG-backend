const express = require('express');

const { validationToken } = require('../util/auth');

const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/check', validationToken, bookingController.myBookingList);
router.post('/', validationToken, bookingController.createBooking);

module.exports = {
  router,
};
