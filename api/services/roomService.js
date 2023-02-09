const roomDao = require('../models/roomDao');

const getRooms = async (query) => {
  const result = await roomDao.getRooms(query);
  return result;
};

module.exports = {
  getRooms,
};
