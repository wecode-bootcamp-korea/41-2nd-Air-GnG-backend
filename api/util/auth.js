const jwt = require('jsonwebtoken');
const { detectError } = require('./detectError');

const validationToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) detectError('NONE_ACCESS_TOKEN', 401);

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decode) detectError('USER_DOES_NOT_EXIST', 404);

  req.userId = decode.userId;
  next();
};

module.exports = {
  validationToken,
};
