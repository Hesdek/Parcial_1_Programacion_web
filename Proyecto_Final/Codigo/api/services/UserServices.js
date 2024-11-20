import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db.js';

class UserServices {
  static async login(names, passwords) {
    const query = 'SELECT * FROM Users WHERE names = $1';
    const { rows } = await pool.query(query, [names]);
    if (rows.length === 0) return null;

    const user = rows[0];
    const isValid = await bcrypt.compare(passwords, user.passwords);
    if (!isValid) return null;

    const token = jwt.sign({ id_user: user.id_user, is_admin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  static async register(names, passwords, is_admin = false) {
    const hash = await bcrypt.hash(passwords, 10);
    const query = 'INSERT INTO Users (names, passwords, is_admin) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query, [names, hash, is_admin]);
    return rows[0];
  }
}

export default UserServices;
