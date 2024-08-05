// library imports
import validator from 'validator';
import jwt from 'jsonwebtoken';

// file imports
import User from "../models/userModel.js";
import { JWT_SECRET } from '../config/env.js';
import { errorHandler } from '../utils/errorHandler.js';

export const register = async (req, res, next) => {
    const user = req.body;

    if(!user.userName || !user.fullName || !user.email || !user.password || !user.confirmPassword) {
        return next(errorHandler(400, "All fields are required"));
    }

    if(!validator.isEmail(user.email) || !validator.contains(user.email, "ves.ac.in")) {
        return next(errorHandler(400, "Invalid email"));
    }

    if(user.password.length < 8) {
        return next(errorHandler(400, "Password must be at least 8 characters long"));
    }

    if(user.password !== user.confirmPassword) {
        return next(errorHandler(400, "Passwords do not match"));
    }

    try {
        const existingUser = await User.findOne({email: user.email});
        if(existingUser) return next(errorHandler(400, "User already exists"));

        const newUser = await User.create({
            userName: user.userName,
            fullName: user.fullName,
            email: user.email,
            password: user.password
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        console.log("Error in authController (register)", error.message)
        return next(errorHandler(500, "Internal Server Error"));
    }
}

export const login = async (req, res, next) => {
    const user = req.body;

    if(!user.email || !user.password) {
        return next(errorHandler(400, "All fields are required"));
    }

    if(!validator.isEmail(user.email) || !validator.contains(user.email, "ves.ac.in")) {
        return next(errorHandler(400, "Invalid email"));
    }

    try {
        const existingUser = await User.findOne({email: user.email});

        if(!existingUser) return next(errorHandler(400, "Invalid credentials"));

        if(existingUser.password !== user.password) return next(errorHandler(400, "Invalid credentials"));

        const token = jwt.sign({id: existingUser.id}, JWT_SECRET, {expiresIn: "1h"});

        if(!token){
            console.log("Error in authController (login) Fialed to generate token (token)");
            return next(errorHandler(500, "Internal Server Error"));
        }

        return res.cookie("token", token, {
            httpOnly: true, 
            secure: true, 
            maxAge: 24*60*60*1000
        })
        .status(200)
        .json({
            success: true,
            message: "Login successful",
            user: existingUser
        });
    } catch (error) {
        console.log("Error in authController (login)", error.message)
        return next(errorHandler(500, "Internal Server Error"));
    }
}

export const logout = (req, res, next) => {
    try {       
        return res
            .clearCookie("token")
            .status(200)
            .json({
                success: true,
                message: "Logout successful"
            });
    } catch (error) {
        console.log("Error in authController (logout)", error.message)
        return next(errorHandler(500, "Internal Server Error"));
    }
}