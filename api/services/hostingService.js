const hostingDao = require('../models/hostingDao');

const createHost = async (userId, title, content, description, price, maximumPeople, bedroom, bed, bathroom, themeId, regionId, roomTypeId, latitude, longitude, images) => {
  return await hostingDao.createHost(userId, title, content, description, price, maximumPeople, bedroom, bed, bathroom, themeId, regionId, roomTypeId, latitude, longitude, images);
};

const hostingRooms = async (userId) => {
  const result = await hostingDao.hostingRooms(userId);
  return result;
};

module.exports = {
  createHost,
  hostingRooms,
};
