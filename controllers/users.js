const { request, response } = require('express');

const userRouter = require('express').Router();

userRouter.post('/', async (request, response) => {
  console.log(request.body);
  const { name, lastname, email, cedula, phone, birthday, admission, usertype } = request.body;
  console.log(name, lastname, email, cedula, phone, birthday, admission, usertype);
  if (!name || !lastname || !email || !cedula || !phone || !birthday || !admission || !usertype) {
    return response.status(400).json({ error: 'Todos los espacios son requeridos' });
  }
});

module.exports = userRouter;