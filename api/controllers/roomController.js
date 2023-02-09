const roomService = require('../services/roomService');
const { catchAsync } = require('../middlewares/error');

const getRooms = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await roomService.getRooms(query);

  return res.status(200).json(result);
});

const getRoomByDetail = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const room = await roomService.getRoomByDetail(roomId);
  return res.status(200).json(room);
});

const addRoomToWishList = catchAsync(async (req, res) => {
  const { roomId } = req.body;
  await roomService.addRoomToWishList(req.userId, roomId);
  return res.status(200).json({ message: 'WISH_LIST_COMPLETE' });
});

const deleteWishList = catchAsync(async (req, res) => {
  const { roomId } = req.body;
  const userId = req.userId;

  await roomService.deleteWishList(userId, roomId);
  return res.status(200).json({ message: 'DELETE_WISH_LIST' });
});

const getMyWishList = catchAsync(async (req, res) => {
  const wishList = await roomService.getMyWishList(req.userId);

  return res.status(200).json(wishList);
});

module.exports = {
  getRooms,
  getRoomByDetail,
  addRoomToWishList,
  deleteWishList,
  getMyWishList,
};
