import express from 'express';
import { getAppointmentsByPatient, createAppointment, updateAppointment, deleteAppointment } from '../controllers/AppointmentController.js';
import { authenticate } from '../middlewares/middleware.js';

const router = express.Router();

router.get('/', authenticate, getAppointmentsByPatient);
router.post('/', authenticate, createAppointment);
router.put('/:appointmentId', authenticate, updateAppointment);
router.delete('/:appointmentId', authenticate, deleteAppointment);

export default router;
