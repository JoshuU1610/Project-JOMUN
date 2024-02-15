/* eslint-disable no-unused-vars */
const taskRouter = require('express').Router();
const task = require('../models/task');
const user = require('../models/user');

taskRouter.post('/', async (request, response) => {
  const { TaskName, description, meetingDay, UserTypes } = request.body;
  try {
    if (!TaskName || !description || !meetingDay || !UserTypes) {
      return response.status(400).json({ message: 'Todos los datos son requeridos' });
    }
    const userid = request.user.id;
    console.log(userid);
    const newTask = new task({
      TaskName: TaskName,
      description: description,
      meetingDay: meetingDay,
      userCreator: userid,
      UserTypes: UserTypes,
    });

    const savedTask = await newTask.save();
    console.log(savedTask);
    return response.status(200).json({ message: 'El usuario ha sido creado correctamente, revisa el correo' });
  } catch (error) {
    return response.status(500).json({ message: 'Hubo un problema al crear el usuario' });
  }
});


taskRouter.get('/tasks', async (request, response) => {
  const userData = request.user;

  try {
    if (!userData) {
      return response.sendStatus(401);
    }

    let tasks;

    // Lógica condicional para determinar la consulta según el tipo de usuario
    if (userData.usertype === 'Super Admin') {
      // Si es Super Admin, traer todas las tareas
      tasks = await task.find({});
    } else {
      // Si no es Super Admin, traer tareas que contengan el usertype en UserTypes
      tasks = await task.find({ UserTypes: userData.usertype });
    }

    response.json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    response.status(500).send('Error interno del servidor');
  }
});

taskRouter.delete('/delete/:taskid', async (request, response) => {
  try {
    const taskid = request.params.taskid;
    console.log(taskid);
    if (!taskid) {
      return response.sendStatus(401);
    }

    await task.findByIdAndDelete(taskid);

    return response.sendStatus(202);
  } catch (error) {
    console.log(error);
  }
});

module.exports = taskRouter;