const roomDao = require('../models/roomDao');

const getRooms = async (query) => {
  const result = await roomDao.getRooms(query);
  return result;
};

const getRoomByDetail = async (roomId) => {
  const room = await roomDao.getRoomByDetail(roomId);
  return room;
};

const addRoomToWishList = async (userId, roomId) => {
  return await roomDao.addRoomToWishList(userId, roomId);
};

const deleteWishList = async (userId, roomId) => {
  const result = await roomDao.deleteWishList(userId, roomId);
  return result;
};

const getMyWishList = async (userId) => {
  const wishList = await roomDao.getMyWishList(userId);
  return wishList;
};
module.exports = {
  getRooms,
  getRoomByDetail,
  addRoomToWishList,
  deleteWishList,
  getMyWishList,
};
