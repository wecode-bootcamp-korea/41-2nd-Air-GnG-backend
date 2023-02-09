const roomService = require('../services/roomService');
const { catchAsync } = require('../middlewares/error');

const getRooms = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await roomService.getRooms(query);

  return res.status(200).json(result);
});

module.exports = {
  getRooms,
};
