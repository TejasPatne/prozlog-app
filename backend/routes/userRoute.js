import express from "express";
import { avatar, getUser, update } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/:id", getUser);
router.post("/update/:id", authMiddleware, update);
router.post('/upload', authMiddleware, upload.single('image'), avatar);

export default router;