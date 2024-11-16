import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Patient } from '../models/Patient.js';

export const login = async (req, res) => {
  const { email, passwords } = req.body;
  try {
    const patient = await Patient.findByEmail(email);
    if (!patient || passwords !== patient.passwords) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: patient.id, role: 'patient' }, process.env.JWT_SECRET, { expiresIn: '30m' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
