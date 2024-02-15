const jwt = require('jsonwebtoken');
const user = require('../models/user');

const userExtractor = async (request, response, next) => {
  try {
    const cookie = request.cookies;
    const accessToken = cookie?.accessToken;
    if (!accessToken) {
      return response.sendStatus(401);
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const userData = await user.findById(decoded.id);
    request.user = userData;
  } catch (error) {
    response.sendStatus(403);
  }

  next();
};

module.exports = { userExtractor };