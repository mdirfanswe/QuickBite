import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://quickbites:90487860@cluster0.nm4lm1v.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}