import express from 'express';
import { getDoctorById, getAppointmentsByDoctor } from '../controllers/DoctorController.js';
import { authenticate } from '../middlewares/middleware.js';

const router = express.Router();

router.get('/:doctorId', authenticate, getDoctorById);
router.get('/:doctorId/appointment', authenticate, getAppointmentsByDoctor);

export default router;
