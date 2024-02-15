// eslint-disable-next-line no-unused-vars
const { request, response } = require('express');

const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');

userRouter.post('/', async (request, response) => {
  // console.log(request.body);
  const { name, lastname, email, cedula, phone, birthday, admission, usertype, password } = request.body;
  // console.log(name, lastname, email, cedula, phone, birthday, admission, usertype, password);

  try {
    if (!name || !lastname || !email || !cedula || !phone || !birthday || !admission || !usertype) {
      throw new Error('Todos los espacios son requeridos');
    }

    const userexist = await user.findOne({ email });

    if (userexist) {
      return response.status(400).json({ message: 'Este email ya esta en uso' });
    }
    console.log('Usuario creado con éxito');
    const saltRounds = 10;
    const passwordhash = await bcrypt.hash(password, saltRounds);
    const newUser = new user({
      name,
      lastname,
      email,
      cedula,
      passwordhash,
      phone,
      birthday,
      admission,
      usertype,
    });
    // se envia el usuario a la bd
    const savedUser = await newUser.save();
    console.log(savedUser);
    //token que trae el id
    const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '2d'
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: savedUser.email, // list of receivers
      subject: 'Bienvenido a JOMUN', // Subject line
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  background-color: #f0f0f0;
                  font-family: Arial, sans-serif;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
      
              .card {
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
      
              .logo {
                  display: block;
                  margin: 0 auto;
                  max-width: 100%;
                  height: auto;
                  margin-bottom: 20px;
              }
      
              .title {
                  font-size: 24px;
                  font-weight: bold;
                  text-align: center;
                  margin-bottom: 10px;
              }
      
              .description {
                  text-align: center;
                  margin-bottom: 20px;
                  color: #666666;
              }
      
              .button {
                  display: block;
                  width: 100%;
                  text-align: center;
                  padding: 10px;
                  background-color: #3498db;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s ease;
              }
      
              .button:hover {
                  background-color: #2980b9;
              }
          </style>
          <title>Correo de Verificación</title>
      </head>
      <body>
      
      <div class="container">
          <div class="card">
              <h1 class="title">BIENVENIDO A JOMUN</h1>
              <p class="description">Gracias por unirte a JOMUN. Para completar tu registro, haz clic en el botón de abajo.</p>
              <a href="${PAGE_URL}/verify/${savedUser.id}/${token}" class="button">Verificar Correo</a>
          </div>
      </div>
      
      </body>
      </html>
      `, // html body
    });

    console.log('se ha enviado el correo');

    // Devolvemos una respuesta de éxito al cliente
    return response.status(200).json({ message: 'El usuario ha sido creado correctamente, revisa el correo' });
  } catch (error) {
    console.error('Error al crear el usuario:', error.message);
    return response.status(500).json({ message: 'Hubo un problema al crear el usuario' });
  }
});

userRouter.patch('/:userid/:token', async (request, response) => {
  try {
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    console.log(id);
    await user.findByIdAndUpdate(id, { verified: true });
    return response.sendStatus(200);
  } catch (error) {
    //conseguir los datos del usuario
    const userId = request.params.userid;
    const { email } = await user.findById(userId);
    console.log(email);

    const token = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '2d'
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of receivers
      subject: 'Bienvenido a JOMUN', // Subject line
      html: `<a href="${PAGE_URL}/verify/${userId}/${token}">Verificar Correo</a>`, // html body
    });

    console.log('se ha enviado el correo');
    return response.status(400).json({ message: 'Error el link esta vencido, se ha enviado un nuevo link' });
  }
});

userRouter.get('/users', async (request, response) => {
  const userData = request.user;

  try {
    if (!userData) {
      response.sendStatus(401);
      return;
    }

    let users;

    // Lógica condicional para determinar la consulta según el tipo de usuario
    if (userData.usertype === 'Super Admin') {
      // Si es Super Admin, traer todos los usuarios excluyendo tu propio usuario
      users = await user.find({ _id: { $ne: userData._id } });
    } else if (userData.usertype === 'Profesor Adjunto') {
      // Si es Profesor Adjunto, traer usuarios con tipos específicos
      users = await user.find({
        usertype: { $in: ['Faculty', 'Profesor Adjunto', 'Secretario', 'Delegado Senior', 'Delegado Junior'] },
        _id: { $ne: userData._id }, // Excluir tu propio usuario
      });
    } else if (userData.usertype === 'Faculty' || userData.usertype === 'Secretario') {
      // Si es Faculty o Secretario, traer usuarios con tipos específicos
      users = await user.find({
        usertype: { $in: ['Faculty', 'Secretario', 'Delegado Senior', 'Delegado Junior'] },
        _id: { $ne: userData._id }, // Excluir tu propio usuario
      });
    } else if (userData.usertype === 'Delegado Senior') {
      // Si es Delegado Senior, traer usuarios con tipo Delegado Senior
      users = await user.find({
        usertype: 'Delegado Senior',
        _id: { $ne: userData._id }, // Excluir tu propio usuario
      });
    } else if (userData.usertype === 'Delegado Junior') {
      // Si es Delegado Junior, traer usuarios con tipo Delegado Junior
      users = await user.find({
        usertype: 'Delegado Junior',
        _id: { $ne: userData._id }, // Excluir tu propio usuario
      });
    }

    response.json(users);

  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    response.status(500).send('Error interno del servidor');
  }

});

userRouter.get('/users/count', async (request, response) => {
  const userData = request.user;

  try {
    if (!userData) {
      response.sendStatus(401);
      return;
    }

    let userCounts = {};

    // Contar usuarios con tipo Faculty
    userCounts['Faculty'] = await user.countDocuments({ usertype: 'Faculty' });

    // Contar usuarios con tipo Delegado Senior
    userCounts['Senior'] = await user.countDocuments({ $or: [{ usertype: 'Delegado Senior' }, { usertype: 'Secretario' }] });


    // Contar usuarios con tipo Delegado Junior
    userCounts['Junior'] = await user.countDocuments({ usertype: 'Delegado Junior' });


    response.json(userCounts);
  } catch (error) {
    console.error('Error al obtener el conteo de usuarios:', error);
    response.status(500).send('Error interno del servidor');
  }
});


userRouter.delete('/delete/:userid', async (request, response) => {
  try {
    const userid = request.params.userid;
    console.log(userid);
    if (!userid) {
      return response.sendStatus(401);
    }

    await user.findByIdAndDelete(userid);

    return response.sendStatus(202);
  } catch (error) {
    console.log(error);
  }
});

userRouter.get('/getdata', async (request, response) => {
  try {
    const userId = request.user.id;

    if (!userId) {
      return response.sendStatus(401);
    }

    const userData = await user.findById(userId);

    if (!userData) {
      return response.sendStatus(404).json({ message: 'Usuario no encontrado' });
    }

    // Puedes devolver los datos del usuario en la respuesta
    return response.status(200).json(userData);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error interno del servidor' });
  }
});


module.exports = userRouter;