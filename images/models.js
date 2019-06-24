'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ImageSchema = mongoose.Schema({
  data: Buffer,
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;