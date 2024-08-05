import cloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const update = async (req, res, next) => {
    const { id } = req.params;
    let inputs = req.body;
    try {
        if(id !== req.user.id) return next(errorHandler(401, "Unauthorized. You can only update your own account"));

        if(Object.entries(inputs).length === 0) next(errorHandler(400, "No field was provided for update"));

        const existingUser = await User.findById(id);
        if(!existingUser) return next(errorHandler(404, "User not found"));

        // ensure that user cannot change their email
        if(inputs.email && (existingUser.email !== inputs.email)) return next(errorHandler(400, "Email cannot be changed"));

        // if password is provided, ensure it is at least 8 characters long
        if(inputs.password && (inputs.password.length < 8)) return next(errorHandler(400, "Password must be at least 8 characters long"));

        // if password is provided, confirmPassword must also be provided
        if(inputs.password && (inputs.password !== inputs.confirmPassword)) return next(errorHandler(400, "Passwords do not match"));

        if(!inputs.password || inputs.password.trim().length === 0){
            inputs = {
                ...inputs,
                password: existingUser.password
            }
        }

        const updatedUser = await User.findByIdAndUpdate(id, inputs, {new: true});

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        })
    } catch (error) {
        console.log("Error in userController (update)", error.message);
        return next(errorHandler(500, "Internal Server Error"));
    }
};

export const getUser = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const user = await User.findById(id);
        if(!user) return next(errorHandler(404, "User not found"));
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log("Error in userController (getUser)", error.message);
        return next(errorHandler(500, "Internal Server Error"));
    }
}

export const avatar = async (req, res, next) => {
    const { id } = req.user;
    
    try {
        const existingUser = await User.findById(id);
        if(!existingUser) return next(errorHandler(404, "User not found"));

        if(!req.file) return next(errorHandler(400, "No file was uploaded"));
        if(existingUser.avatar?.public_id !== ""){
            await cloudinary.uploader.destroy(existingUser.avatar.public_id);
        }

        // Upload new image
        const { path, filename } = req.file;
        const public_id = filename;

        // Update user's avatar in the database
        existingUser.avatar = {
            public_id: public_id,
            url: path
        };
        await existingUser.save();

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            user: existingUser
        });  
    } catch (error) {
        console.log("Error in userController (avatar)", error.message);
        return next(errorHandler(500, "Internal Server Error"));
    }

  }