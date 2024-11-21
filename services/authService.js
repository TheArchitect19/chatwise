const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwtUtils');

const registerUser = async (username, name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, name, email, passwordHash: hashedPassword });
  await user.save();

  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.generateToken({ id: user._id, username: user.username });
  return { user, token };
};

module.exports = { registerUser, loginUser };
