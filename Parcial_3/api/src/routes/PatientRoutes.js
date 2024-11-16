import express from 'express';
import { login } from '../controllers/PatientController.js';
import { validateLogin } from '../middlewares/middleware.js';

const router = express.Router();

router.post('/login', validateLogin, login);

export default router;
