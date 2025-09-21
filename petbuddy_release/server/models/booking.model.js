import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  date: String,
  notes: String
}, { timestamps: true });
export default mongoose.model('Booking', bookingSchema);
