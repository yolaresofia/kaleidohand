const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    data: Object
  }
);

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
