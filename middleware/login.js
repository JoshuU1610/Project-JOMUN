const jwt = require('jsonwebtoken');
const user = require('../models/user');

const verifyuser = async (request, response, next) => {
  try {
    const cookie = request.cookies;
    const accessToken = cookie?.accessToken;

    if (!accessToken) {
      // Si no hay token, redirige a la ruta /signup
      return response.redirect('/signup');
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const userData = await user.findById(decoded.id);

    if (!userData) {
      // Si el usuario no existe, también redirige a la ruta /signup
      return response.redirect('/signup');
    }

    // Si el usuario existe, redirige a la ruta /admin
    response.redirect('/admin');
  } catch (error) {
    response.sendStatus(403);
  }

  next();
};

module.exports = { verifyuser };
