const bookingService = require('../services/bookingService');
const { catchAsync } = require('../middlewares/error');
const { detectError } = require('../util/detectError');

const createBooking = catchAsync(async (req, res) => {
  const { roomId, checkIn, checkOut, guestNumber, totalPrice } = req.body;
  const guestId = req.userId;

  if (!roomId || !checkIn || !checkOut || !guestNumber || !totalPrice) {
    detectError('BOOKING_ERROR', 400);
  }

  await bookingService.createBooking(guestId, roomId, checkIn, checkOut, guestNumber, totalPrice);
  return res.status(201).json({ message: 'BOOKING_COMPLETE' });
});

const myBookingList = catchAsync(async (req, res) => {
  const guestId = req.userId;
  const bookingCheck = await bookingService.myBookingList(guestId);
  return res.status(200).json(bookingCheck);
});

module.exports = {
  createBooking,
  myBookingList,
};
