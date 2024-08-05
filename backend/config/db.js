import mongoose from "mongoose";
import { MONGO } from "./env.js";

export const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO)
        console.log("connected to mongodb database")
    } catch (error) {
        console.log("Error in connectToDb", error);
    }
}