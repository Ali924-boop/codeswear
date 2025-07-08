import mongoose from 'mongoose';

const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  
  console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug line

  await mongoose.connect(process.env.MONGODB_URI);
  return handler(req, res);
};

export default connectDb;
