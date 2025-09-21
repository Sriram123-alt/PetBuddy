import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/user.model.js';
import Service from './models/service.model.js';
dotenv.config();
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/petbuddy';
await mongoose.connect(uri);
console.log('Connected for seeding');
await User.deleteMany({}); await Service.deleteMany({});
const admin = new User({ name:'Admin', email:'admin@petbuddy.test', password:'admin123', role:'admin' });
await admin.save();
const s1 = new Service({ title:'Dog Walking', 
    category:'Walking', description:'30 min walk',
     price:10, 
     imageUrl:'/images/walk.jpg' });
const s2 = new Service({ title:'Grooming',
     category:'Grooming', 
     description:'Full grooming', 
     price:30, imageUrl:'/images/groom.jpg' });
await s1.save(); 
await s2.save();
console.log('Seeded: admin@petbuddy.test / admin123'); process.exit(0);
