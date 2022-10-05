const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
    // require: true,
  },
});

// const Userdb = mongoose.model('userdb'.schema);

module.exports = mongoose.model('Userdb', userSchema);
