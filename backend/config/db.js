import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Vikash_kumar_07:Vikash98012@cluster0.t0fs9jd.mongodb.net/razz-food').then(()=>console.log("DataBase connected"));
}