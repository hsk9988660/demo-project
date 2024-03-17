const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carModel: { type: String, required: true, minlength: 3 },
  price: { type: Number, required: true },
  phoneNumber: { type: String, required: true, match: /^\d{11}$/ },
  maxPictures: { type: Number, required: true, min: 1, max: 10 },
  city: { type: String, required: true,},
  images: [{ type: String }], // Array of image URLs
});

module.exports = mongoose.model('Car', carSchema);
