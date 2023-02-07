const hostingService = require('../services/hostingService');
const { catchAsync } = require('../middlewares/error');
const { detectError } = require('../util/detectError');

const createHost = catchAsync(async (req, res) => {
  const { title, content, description, price, maximumPeople, bedroom, bed, bathroom, themeId, regionId, roomTypeId, latitude, longitude } = req.body;
  const userId = req.userId;
  const images = req.files.map(({ location }) => location);

  if (!title || !description || !price || !maximumPeople || !bedroom || !bed || !bathroom || !themeId || !regionId || !roomTypeId || !content || !latitude || !longitude || !images) {
    detectError('HOSTING_KEY_ERROR', 400);
  }
  await hostingService.createHost(userId, title, content, description, price, maximumPeople, bedroom, bed, bathroom, themeId, regionId, roomTypeId, latitude, longitude, images);
  return res.status(201).json({ message: 'HOST_CREATE_COMPLETED!' });
});

const hostingRooms = catchAsync(async (req, res) => {
  const hostingRoom = await hostingService.hostingRooms(req.userId);
  return res.status(200).json(hostingRoom);
});

module.exports = {
  createHost,
  hostingRooms,
};
