const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const taskRouter = require('./controllers/task');
const { userExtractor } = require('./middleware/auth');
const { MONGO_URI } = require('./config');
const adminRouter = require('./controllers/admin');

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
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
app.use('/components', express.static(path.resolve(__dirname, 'views', 'components')));
app.use('/verify/:userid/:token', express.static(path.resolve(__dirname, 'views', 'verify')));

app.use(morgan('tiny'));

//Rutas Backend
app.use('/api/users', userExtractor , userRouter);
app.use('/api/task', userExtractor , taskRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/admin', adminRouter);

// Ruta para páginas dinámicas del panel de administración
app.get('/admin/:pagina', (req, res) => {
  const pagina = req.params.pagina;
  res.sendFile(path.join(__dirname, 'views', 'admin', `${pagina}.html`));
});

module.exports = app;