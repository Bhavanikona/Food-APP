// import mongoose from "mongoose";

//  export const connectDB =async ()=>{
//     (await mongoose.connect('mongodb+srv://bhanukona24:9014249910@cluster0.ncwp7wi.mongodb.net/food-app').then(()=>console.log("DB connected"))
// )}
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/food-app';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

 

