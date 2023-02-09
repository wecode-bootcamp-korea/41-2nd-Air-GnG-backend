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

module.exports = {
  getRooms,
  getRoomByDetail,
};
