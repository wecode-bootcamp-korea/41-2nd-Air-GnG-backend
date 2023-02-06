const { mysqlDatabase } = require('../models/dbconfig');
const { detectError } = require('../util/detectError');

const BookingStatusEnum = Object.freeze({
  예약요청: 1,
  호스트확인: 2,
  예약완료: 3,
});

const createBooking = async (guestId, roomId, checkIn, checkOut, guestNumber, totalPrice, bookingNumber) => {
  try {
    return await mysqlDatabase.query(
      `
      INSERT INTO bookings (
        guest_id,
        room_id,
        check_in_date,
        check_out_date,
        guest_number,
        total_price,
        booking_status_id,
        booking_number
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [guestId, roomId, checkIn, checkOut, guestNumber, totalPrice, BookingStatusEnum.예약요청, bookingNumber]
    );
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 500);
  }
};

const myBookingList = async (guestId) => {
  try {
    return await mysqlDatabase.query(
      `
      SELECT
        b.guest_id,
        b.room_id,
        b.guest_number,
        b.total_price,
        b.check_in_date,
        b.check_out_date,
        JSON_ARRAYAGG(
          ri.image_url
        ) as room_images
      FROM bookings b
      LEFT JOIN room_images ri ON b.room_id = ri.room_id
      WHERE b.guest_id = ?
      GROUP BY b.guest_id,b.room_id, b.guest_number, b.total_price, b.check_in_date, b.check_out_date;
      `,
      [guestId]
    );
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 500);
  }
};
module.exports = {
  createBooking,
  myBookingList,
};
