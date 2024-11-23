import express from 'express';
import pkg from 'pg';  // Importación por defecto
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';  // Importación correcta de path

const { Pool } = pkg; // Extraemos la clase Pool de pkg

dotenv.config(); // Cargar las variables de entorno

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

// Validar variables de entorno requeridas
const requiredEnv = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'API_KEY'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length) {
  console.error(`Error: Missing required environment variables: ${missingEnv.join(', ')}`);
  process.exit(1);
}

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Middleware para json
app.use(express.json());

// Servir archivos estáticos desde 'pages' y 'resources'
app.use('/resources', express.static(path.join(__dirname, 'resources')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));


// Ruta principal para el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para obtener la clave API
app.get('/api-key', (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});

// Ruta para verificar el estado de la API
app.get('/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

// Ruta para obtener datos desde PostgreSQL
app.get('/users', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM Users');
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener eventos
app.get('/events', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM Events');
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener participaciones
app.get('/participations', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM Participation');
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No participations found' });
    }
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});


// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
