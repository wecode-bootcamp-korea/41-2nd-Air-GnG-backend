const { mysqlDatabase } = require('./dbconfig');
const { detectError } = require('../util/detectError');
const QueryBuilder = require('../util/queryBuilder');

const getRooms = async (query) => {
  try {
    const { themeId, maxGuest, roomType, bed, bedroom, bathroom, region, priceMin, priceMax, checkIn, checkOut, limit, offset } = query;
    const queryBuilder = new QueryBuilder(themeId, maxGuest, roomType, bed, bedroom, bathroom, region, priceMin, priceMax, checkIn, checkOut, limit, offset);
    const queryFilter = queryBuilder.buildQuery();
    const result = await mysqlDatabase.query(
      `
      SELECT
        r.id,
        r.title,
        r.price,
        r.latitude,
        r.longitude,
            JSON_ARRAYAGG(ri.image_url) as images
        FROM rooms r
        INNER JOIN room_images ri ON r.id = ri.room_id
        ${queryFilter}
      `
    );
    return result;
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 500);
  }
};

const getRoomByDetail = async (roomId) => {
  try {
    const room = await mysqlDatabase.query(
      `
      SELECT
          r.id,
          r.title,
          r.description,
          r.maximum_people,
          r.bedroom_count,
          r.bed_count,
          r.bathroom_count,
          r.price,
          r.address,
          r.latitude,
          r.longitude,
          u.nickname as host_name,
          u.profile_image as host_image,
          h.content as host_content,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "check_in_date", b.check_in_date,
              "check_out_date", b.check_out_date
            )
          ) as book_date,
          images.room_image
        FROM rooms r
        INNER JOIN hosts h ON r.host_id = h.id
        INNER JOIN users u ON u.id = h.user_id
        LEFT JOIN bookings b ON b.room_id = r.id
		RIGHT JOIN (
        SELECT
        r.id,
          JSON_ARRAYAGG(
              ri.image_url
          ) as room_image FROM room_images ri INNER JOIN rooms r ON r.id=ri.room_id GROUP BY r.id)
		AS images ON images.id=r.id
        WHERE r.id = ?
        GROUP BY r.id;
      `,
      [roomId]
    );
    return room;
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 500);
  }
};

module.exports = {
  getRooms,
  getRoomByDetail,
};
