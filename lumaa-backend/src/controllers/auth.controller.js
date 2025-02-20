import authService from '../services/auth.service.js';

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    await authService.register(username, password);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.message === 'USER_ALREADY_EXISTS') {
      return res.status(400).json({ message: 'User already exists' });
    }
    console.log(error)
    return res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      const token = await authService.login(username, password);
      return res.json({ token });
    } catch (error) {
      console.log(error)
      if (error.message === 'INVALID_CREDENTIALS') {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      return res.status(500).json({ message: 'Server error' });
    }
};

export default { register, login };