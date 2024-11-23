import express from 'express';
import { createEvent, deleteEvent, getEventDetails } from '../controllers/EventControllers.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, isAdmin, createEvent);
router.delete('/:id', protect, isAdmin, deleteEvent);
router.get('/:id', protect, getEventDetails);

export default router;