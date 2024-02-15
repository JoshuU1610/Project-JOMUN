const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  cedula: Number,
  passwordhash: {
    type: String,
    default: 'JOMUN123'
  },
  phone: Number,
  birthday: Date,
  admission: Date,
  usertype: String,
  verified: {
    type: Boolean,
    default: false,
  },
  userCreator: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks',
  }],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete  returnedObject._id;
    delete  returnedObject.__v;
    delete  returnedObject.passwordHash;
  }
});

const user = mongoose.model('User', userSchema);

module.exports = user;
