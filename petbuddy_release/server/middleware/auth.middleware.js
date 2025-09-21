import jwt from 'jsonwebtoken';
export const protect = (req,res,next)=>{
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({message:'No token'});
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'petbuddysecret');
    req.user = decoded;
    next();
  } catch(err){
    return res.status(401).json({message:'Invalid token'});
  }
};
export const adminOnly = (req,res,next)=>{
  if(req.user?.role !== 'admin') return res.status(403).json({message:'Admin only'});
  next();
};
