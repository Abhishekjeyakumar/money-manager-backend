import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("❌ MONGO_URI is missing in environment variables");
      return; // don't crash immediately
    }

    // Optional: log only first part (safer)
    console.log("✅ MONGO_URI loaded");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    // TEMP while debugging on Render (avoid Bad Gateway due to crash)
    // process.exit(1);
  }
};

export default connectDB;