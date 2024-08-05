import { JWT_SECRET } from "../config/env.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(errorHandler(401, "Please login to access this resource"));
    }
    try {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return next(errorHandler(403, "Please login to access this resource"));
            }
            req.user = user;
            next();
        })
    } catch (error) {
        return next(error);
    }
}