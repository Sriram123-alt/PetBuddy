import Service from '../models/service.model.js';
export const createService = async (req,res)=>{
  try{
    const s = new Service(req.body);
    await s.save();
    res.status(201).json(s);
  }catch(err){ res.status(500).json({ message: err.message }); }
};
export const getServices = async (req,res)=>{
  const services = await Service.find().sort({createdAt:-1});
  res.json(services);
};
export const getServiceById = async (req,res)=>{
  const s = await Service.findById(req.params.id);
  if(!s) return res.status(404).json({message:'Not found'});
  res.json(s);
};
export const updateService = async (req,res)=>{
  const s = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(s);
};
export const deleteService = async (req,res)=>{
  await Service.findByIdAndDelete(req.params.id);
  res.json({message:'Deleted'});
};
