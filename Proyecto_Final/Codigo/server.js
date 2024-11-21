import express from 'express';
import pkg from 'pg';  // Importación por defecto
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';  // Importación correcta de path

const { Pool } = pkg; // Extraemos la clase Pool de pkg

dotenv.config(); // Cargar las variables de entorno

// Obtiene el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

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
app.use(express.static('Codigo'));

// Configuración para servir archivos estáticos desde las carpetas 'pages' y 'resources'
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/resources', express.static(path.join(__dirname, 'resources')));


// Validar configuración
if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error('Error: Missing required environment variables');
  process.exit(1);
}

// Servir el archivo index.html cuando se accede a la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Aquí se usa path.join correctamente
});

// Ruta para obtener la clave API
app.get('/api-key', (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});

// Ruta para obtener datos desde PostgreSQL
app.get('/data', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM your_table'); // Reemplaza con tu tabla
    res.json(result.rows);
  } catch (error) {
    next(error); // Pasar el error al middleware global
  }
});

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
