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

module.exports = {
  getRooms,
};
