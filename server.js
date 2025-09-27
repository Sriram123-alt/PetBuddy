import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './petbuddy_release/server/config/db.js';
import authRoutes from './petbuddy_release/server/routes/auth.routes.js';
import serviceRoutes from './petbuddy_release/server/routes/service.routes.js';
import bookingRoutes from './petbuddy_release/server/routes/booking.routes.js';

dotenv.config();

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Serve static client files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, 'petbuddy_release', 'client', 'public');
app.use(express.static(clientPath));

// Frontend fallback
app.get('/', (req, res) => res.sendFile(path.join(clientPath, 'index.html')));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
