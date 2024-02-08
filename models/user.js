const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  cedula: Number,
  passwordHash: {
    type: String,
    default: 'JOMUN123'
  },
  phone: Number,
  birthday: Date,
  admission: Date,
  userType: String,
  verified: {
    type: Boolean,
    default: false,
  },
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
