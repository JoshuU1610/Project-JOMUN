const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./controllers/users');
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DEV_URI);
    console.log('Conecto a MongoDB');
  } catch (error) {
    console.log(error);
    console.log('No conecto a MongoDB');
  }
})();

// Para leer JSON
app.use(cors());
app.use(express.json());
app.use(cookieParser());


//rutas frontend
app.use('/styles', express.static(path.resolve(__dirname, 'views', 'styles')));
app.use('/images', express.static(path.resolve(__dirname, 'views', 'images')));
app.use('/', express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/signup', express.static(path.resolve(__dirname, 'views', 'singup')));
app.use('/admin', express.static(path.resolve(__dirname, 'views', 'admin')));

app.use(morgan('tiny'));

//Rutas Backend
app.use('/api/users', userRouter);

// Ruta para páginas dinámicas del panel de administración
app.get('/admin/:pagina', (req, res) => {
  const pagina = req.params.pagina;
  res.sendFile(path.join(__dirname, 'views', 'admin', `${pagina}.html`));
});

module.exports = app;