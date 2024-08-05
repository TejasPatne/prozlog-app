import express from "express";
import { register, login, logout } from "../controllers/authController.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/logout", logout);

export default userRoute;