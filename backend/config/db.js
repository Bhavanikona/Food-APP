import mongoose from "mongoose";

 export const connectDB =async ()=>{
    (await mongoose.connect('mongodb+srv://bhanukona24:9014249910@cluster0.ncwp7wi.mongodb.net/food-app').then(()=>console.log("DB connected"))
)}