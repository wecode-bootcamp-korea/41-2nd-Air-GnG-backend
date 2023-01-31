const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./api/routes');
const { globalErrorHandler } = require('./api/middlewares/error');

const createApp = () => {
  const app = express();

  app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
  });

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));

  app.use(routes);
  app.use(globalErrorHandler);

  return app;
};

module.exports = {
  createApp,
};
