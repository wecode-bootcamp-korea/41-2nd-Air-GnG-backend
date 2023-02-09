const uuid = require('uuid');
const bookingDao = require('../models/bookingDao');

const createBooking = async (guestId, roomId, checkIn, checkOut, guestNumber, totalPrice) => {
  const bookingNumber = uuid.v4();
  return await bookingDao.createBooking(guestId, roomId, checkIn, checkOut, guestNumber, totalPrice, bookingNumber);
};

const myBookingList = async (guestId) => {
  return await bookingDao.myBookingList(guestId);
};

module.exports = {
  createBooking,
  myBookingList,
};
