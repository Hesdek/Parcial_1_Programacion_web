const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config(); // Cargar las variables de entorno

const app = express();
const port = 3000;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Ruta para obtener la clave API
app.get('/api-key', (req, res) => {
  // Puedes hacer una verificación de seguridad antes de enviar la clave API
  res.json({ apiKey: process.env.API_KEY });
});

// Ruta para obtener datos desde PostgreSQL
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM your_table'); // Reemplaza con tu tabla
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
