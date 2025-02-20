import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.utils.js'; 

const register = async (username, password) => {
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new Error('USER_ALREADY_EXISTS'); // Throw an error without a message
  }
  const user = await User.create({ username, password });
  return user;
};


const login = async (username, password) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const token = generateToken(user.id);
  return token;
};

export default { register, login };
