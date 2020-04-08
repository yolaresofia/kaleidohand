const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  website: String,
  city: String,
  pictures: [{ type: Schema.Types.ObjectId, ref: 'Picture' }]
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;