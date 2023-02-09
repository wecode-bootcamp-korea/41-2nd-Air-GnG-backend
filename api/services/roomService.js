const roomDao = require('../models/roomDao');

const getRooms = async (query) => {
  const result = await roomDao.getRooms(query);
  return result;
};

const getRoomByDetail = async (roomId) => {
  const room = await roomDao.getRoomByDetail(roomId);
  return room;
};

module.exports = {
  getRooms,
  getRoomByDetail,
};
