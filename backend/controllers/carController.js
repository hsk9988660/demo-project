const Car = require('../models/car.model');

exports.createEntry = async (req, res) => {
  const { carModel, price, phoneNumber, maxPictures, city } = req.body;
  const urls = [];
  for (let i = 0; i < req.files.length; i++) {
    const imagePath = req.files[i].path;
    const imageUrl = `http://localhost:3000/${imagePath}`; 
    urls.push(imageUrl);
  }
  if (!carModel || !price || !phoneNumber || !maxPictures || !city ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new entry
    const newEntry = new Car({
      carModel,
      price,
      phoneNumber,
      maxPictures,
      city,
      images: urls,
    });

    // Save the new entry to the database
    await newEntry.save();

    res.status(201).json({ message: 'Entry created successfully', entry: newEntry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
