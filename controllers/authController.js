const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const user = await authService.registerUser(username, name, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { register, login };
