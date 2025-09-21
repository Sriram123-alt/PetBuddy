import mongoose from 'mongoose';
const serviceSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  price: Number,
  imageUrl: String,
  tags: [String]
}, { timestamps: true });
export default mongoose.model('Service', serviceSchema);
