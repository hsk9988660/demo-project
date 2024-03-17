const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
require('./config/db');

app.use(express.json()); // Add middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Add middleware to parse URL-encoded bodies

app.use("/uploads",express.static("uploads"))
app.use('/auth', authRoutes);
app.use('/', carRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
