import mongoose from "mongoose";
import { DEFAULT_PROFILE_PIC } from "../config/env.js";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        max: 20,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar:{
        public_id: {
            type: String,
            default: "",
        },
        url: {
            type: String,
            required: true,
            default: DEFAULT_PROFILE_PIC
        }
    }
}, { 
    timestamps: true, 
    toJSON: {
        versionKey: false,
        transform(doc, ret) {
            delete ret.__v;
            delete ret.password;
            delete ret.updatedAt;
        }
    }
 });

const User = mongoose.model("User", userSchema);
export default User;