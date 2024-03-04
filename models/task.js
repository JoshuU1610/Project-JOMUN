const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  TaskName: String,
  description: String,
  meetingDay: Date,
  userCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  UserTypes: [
    {
      type: String,
    },
  ],
});
taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete  returnedObject._id;
    delete  returnedObject.__v;
  }
});

const task = mongoose.model('Tasks', taskSchema);

module.exports = task;