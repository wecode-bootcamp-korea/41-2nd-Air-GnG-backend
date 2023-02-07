const { mysqlDatabase } = require('../models/dbconfig');
const { detectError } = require('../util/detectError');

const createHost = async (userId, title, content, description, price, maximumPeople, bedroom, bed, bathroom, themeId, regionId, roomTypeId, latitude, longitude, images) => {
  try {
    const queryRunner = mysqlDatabase.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const [hostUser] = await queryRunner.query(
      `
      SELECT
        id
      FROM hosts
      WHERE hosts.user_id = ?
    `,
      [userId]
    );

    let hostUserId = hostUser?.id;

    if (!hostUser) {
      const createHost = await queryRunner.query(
        `
        INSERT INTO hosts (
          user_id,
          content
      ) VALUES (?, ?)
      `,
        [userId, content]
      );
      hostUserId = createHost.insertId;
    }

    const room = await queryRunner.query(
      `
      INSERT INTO rooms (
        title,
        description,
        price,
        maximum_people,
        bedroom_count,
        bed_count,
        bathroom_count,
        theme_id,
        region_id,
        host_id,
        room_type_id,
        latitude,
        longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [title, description, price, maximumPeople, bedroom, bed, bathroom, themeId, regionId, hostUserId, roomTypeId, latitude, longitude]
    );

    const bulkImage = images.map((imageUrl) => {
      return [imageUrl, room.insertId];
    });

    await queryRunner.query(
      `
        INSERT INTO room_images (
          image_url,
          room_id
        ) VALUES ?
      `,
      [bulkImage]
    );

    await queryRunner.commitTransaction();
    await queryRunner.release();
  } catch (err) {
    console.error(err.stack);
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    detectError('DATABASE_ERROR', 500);
  }
};

const hostingRooms = async (userId) => {
  try {
    const [hostId] = await mysqlDatabase.query(
      `
      SELECT
        h.id
      FROM hosts h
      INNER JOIN users u ON u.id = h.user_id
      WHERE u.id = ?
      `,
      [userId]
    );

    const result = await mysqlDatabase.query(
      `
      SELECT
        r.title,
        r.address,
        b.guest_number,
        b.guest_id,
        b.check_in_date,
        b.check_out_date,
        JSON_ARRAYAGG(
          ri.image_url
        ) as room_images
      FROM hosts h
      INNER JOIN rooms r ON r.host_id = h.id
      INNER JOIN bookings b ON b.room_id = r.id
      LEFT JOIN room_images ri ON r.id = ri.room_id
      WHERE h.id = ?
      GROUP BY r.title, b.guest_number, b.guest_id, b.check_in_date, b.check_out_date, r.address;
      `,
      [hostId.id]
    );
    return result;
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 500);
  }
};

module.exports = {
  createHost,
  hostingRooms,
};
