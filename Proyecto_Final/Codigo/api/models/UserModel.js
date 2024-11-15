// models/userModel.js
const db = require('../config/database');

const User = {
  create: (userData) => {
    const { names, passwords } = userData;
    return db.query(
      'INSERT INTO User (names, passwords) VALUES ($1, $2) RETURNING *',
      [names, passwords]
    );
  },
  
  findById: (id) => {
    return db.query('SELECT * FROM User WHERE id_user = $1', [id]);
  },

  // Otros métodos, como update, delete, etc.
};

module.exports = User;
