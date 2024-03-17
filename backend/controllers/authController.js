const User = require('../models/user.model');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email and password
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // You can generate a JWT token here and send it as a response for authentication
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
