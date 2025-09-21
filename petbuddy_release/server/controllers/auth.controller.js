import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req,res)=>{
  try{
    const { name,email,password } = req.body;
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({ message: 'User exists' });
    const user = new User({ name,email,password });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET || 'petbuddysecret');
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  }catch(err){ res.status(500).json({ message: err.message }); }
};

export const login = async (req,res)=>{
  try{
    const { email,password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if(!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET || 'petbuddysecret');
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  }catch(err){ res.status(500).json({ message: err.message }); }
};
