import mongoose from "mongoose";

  export default async function ConnectionDB(){
  try {
        await mongoose.connect("mongodb://127.0.0.1:27017/saraha_c48", {
            serverSelectionTimeoutMS: 5 * 1000,
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.log("DB connection failed", error);
    }
}