import express from 'express';
import { createBooking, getBookings } from '../controllers/booking.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
const router = express.Router();
router.post('/', createBooking);
router.get('/', protect, adminOnly, getBookings);
export default router;
