import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 
      'mongodb+srv://sriramkanasani:Sriram%40123k@cluster0.t3fak4y.mongodb.net/petbuddy?retryWrites=true&w=majority';

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit if connection fails
  }
};
