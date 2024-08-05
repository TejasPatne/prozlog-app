import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const create = async (req, res, next) => {
    const authUser = req.user;
    let project = req.body;

    if(!authUser) return next(errorHandler(401, "Unauthorized"));

    if(!project.title || !project.domain || !project.description){
        return next(errorHandler(400, "All fields are required"));
    }

    if(project.title.length < 10 || project.title.length > 150){
        return next(errorHandler(400, "Title must be between 10 and 150 characters"));
    }

    if(project.mentors.length > 2 || project.team.length > 4){
        return next(errorHandler(400, "Maximum of 2 mentors and 4 team members allowed"));
    }

    if(project.team.length !== 0){
        const teamMembers = await User.find({
            email: {
                $in: project.team
            }
        });
        
        if(teamMembers.length !== project.team.length){
            return next(errorHandler(400, "Invalid team members"));
        }
        project.team = teamMembers;
    }

    try {
        if(!req.cookies.token) return next(errorHandler(401, "Unauthorized"));
        const validate = jwt.verify(req.cookies.token, JWT_SECRET);
        if(!validate) return next(errorHandler(401, "Unauthorized"));

        const newProject = await Project.create({
            ...project,
            createdBy: authUser.id
        });
        
        return res.status(200).json({
            success: true,
            message: "Project added successfully!",
            project: newProject
        })

    } catch (error) {
        console.log("Error in projectController (create)", error.message);
        return next(errorHandler(500, "Internal Server Error"));
    }
}

export const remove = async (req, res, next) => {
    const { id } = req.params;
    try {
        if(!req.cookies.token) return next(errorHandler(401, "Unauthorized"));
        const validate = jwt.verify(req.cookies.token, JWT_SECRET);
        if(!validate) return next(errorHandler(401, "Unauthorized"));

        await Project.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully!"
        })
    } catch (error) {
        console.log("Error in projectController (remove)", error.message);
        return next(errorHandler(500, "Internal Server Error"));
    }
}

export const update = async (req, res, next) => {
    const { id } = req.params;
    const project = req.body;
    const authUser = req.user;

    try {
        if(!req.cookies.token) return next(errorHandler(401, "Unauthorized"));
        const validate = jwt.verify(req.cookies.token, JWT_SECRET);
        if(!validate) return next(errorHandler(401, "Unauthorized"));

        if(Object.entries(project).length === 0) return next(errorHandler(400, "All fields are required"));
        
        const existingProject = await Project.findById(id);
        if(!existingProject) return next(errorHandler(404, "Project not found"));

        if(authUser.id !== existingProject.createdBy.toString()) return next(errorHandler(401, "Unauthorized"));

        if(project.team && project.team.length !== 0){
            const teamMembers = await User.find({
                email: {
                    $in: project.team
                }
            });
            
            if(teamMembers.length !== project.team.length){
                return next(errorHandler(400, "Invalid team members"));
            }
            project.team = teamMembers;
        }

        const updatedProject = await Project.findByIdAndUpdate(id, {
            existingProject, ...project,
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Project updated successfully!",
            project: updatedProject
        });

    } catch (error) {
        console.log("Error in projectControler (update)", error.message);
        return next(errorHandler(500, "Internal Server Error"));
    }
}

export const getProject = async (req, res, next) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id).populate("team").populate("createdBy");
        if(!project) return next(errorHandler(404, "Project not found"));
        return res.status(200).json({
            success: true,
            project
        })
    } catch (error) {
        console.log("Error in projectController (getProject)", error.message);
        return next(errorHandler(500, "Internal Server Error"));
    }
}

export const getAllProjects = async (req, res, next) => {
    const { id } = req.params;
    const { search } = req.query;

    try {
        if(id){
            const projects = await Project.find({ team: id }).populate("team");
            return res.status(200).json({
                success: true,
                projects
            })
        } else if(search){
            const projects = await Project.find({ 
                $or: [
                    { title: { $regex: search, $options: "i"}},
                    { description: { $regex: search, $options: "i"}}
                ]
            }).populate("team");
            return res.status(200).json({   
                success: true,
                projects
            })
        } else {
            const projects = await Project.find().populate("team");
            return res.status(200).json({
                success: true,
                projects
            })
        }
    } catch (error) {
        console.log("Error in projectController (getAllProjects)", error.message);
        return next(errorHandler(500, "Internal Server Error"));
    }
}