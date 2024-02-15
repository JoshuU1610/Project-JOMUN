const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');


loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const userexist = await user.findOne({ email: email });
  if (!userexist) {
    return response.status(400).json({ message: 'Email invalido' });
  }

  if (!userexist.verified) {
    return response.status(400).json({ message: 'no ha validado su usuario, revise su correo' });
  }

  const isCorrect = await bcrypt.compare(password, userexist.passwordhash);
  if (!isCorrect) {
    return response.status(400).json({ message: 'Contraseña invalida' });
  }

  const userForToken = {
    id: userexist.id,
  };

  const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '2d'
  });

  response.cookie('accessToken', accessToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  });
  return response.status(200).json({ message: 'iniciando sesion' });
});

module.exports = loginRouter;