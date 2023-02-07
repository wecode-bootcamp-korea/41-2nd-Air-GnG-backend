const express = require('express');

const router = express.Router();

const userRouter = require('./userRouter');
const hostingRouter = require('./hostingRouter');

router.use('/auth', userRouter.router);
router.use('/host', hostingRouter.router);

module.exports = router;
