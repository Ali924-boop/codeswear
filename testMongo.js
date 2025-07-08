import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/codeswear";

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

testConnection();
