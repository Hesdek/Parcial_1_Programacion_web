import UserService from '../services/UserServices.js';

export const login = async (req, res) => {
  const { names, passwords } = req.body;
  const token = await UserService.login(names, passwords);
  if (token) {
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
};

export const register = async (req, res) => {
  const { names, passwords, is_admin } = req.body;
  const user = await UserService.register(names, passwords, is_admin);
  res.status(201).json(user);
};
