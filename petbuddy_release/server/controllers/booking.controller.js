import Booking from '../models/booking.model.js';
export const createBooking = async (req,res)=>{
  const b = new Booking(req.body);
  await b.save();
  res.status(201).json(b);
};
export const getBookings = async (req,res)=>{
  const list = await Booking.find().populate('service');
  res.json(list);
};
