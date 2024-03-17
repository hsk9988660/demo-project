const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController.js');
const upload = require("../middleware/uploadimage.js")

router.post('/cars', upload.array('images', 10), carController.createEntry);

module.exports = router;
