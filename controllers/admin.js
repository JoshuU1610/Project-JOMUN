const adminRouter = require('express').Router();
const bcrypt = require('bcrypt');
const user = require('../models/user');

adminRouter.post('/createadminifnotexists', async (request, response) => {
  try {
    const userexist = await user.findOne({ usertype: 'Super Admin' });
    if (userexist) {
      return response.status(400).json({ message: 'Ya el Admin principal exite' });
    }

    const fechaEspecifica = new Date('2004-10-16');
    const fechaActual = new Date();

    const saltRounds = 10;
    const passwordhash = await bcrypt.hash(process.env.PASSWORD_ADMIN , saltRounds);
    const newUser = new user({
      name: 'Sancocho',
      lastname: 'Admin',
      email: 'hernandezmorenojosemiguel@gmail.com',
      cedula: '30579619',
      passwordhash: passwordhash,
      phone: '04242566835',
      birthday: fechaEspecifica,
      admission: fechaActual,
      usertype: 'Super Admin',
      verified: true,
    });
      // se envia el usuario a la bd
    const savedUser = await newUser.save();
    console.log(savedUser);
    return response.status(200).json({ message: 'El usuario ha sido creado correctamente' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = adminRouter;