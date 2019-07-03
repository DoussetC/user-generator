const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'Groland'
  },
  birthdate: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('user', UserSchema);