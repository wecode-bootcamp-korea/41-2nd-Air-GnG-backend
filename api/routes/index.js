const express = require('express');

const router = express.Router();

const userRouter = require('./userRouter');
const hostingRouter = require('./hostingRouter');
const bookingRouter = require('./bookingRouter');
const roomRouter = require('./roomRouter');

router.use('/auth', userRouter.router);

router.use('/host', hostingRouter.router);

router.use('/booking', bookingRouter.router);

router.use('/rooms', roomRouter.router);

module.exports = router;
