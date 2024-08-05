import express from "express";
import { create, getAllProjects, getProject, remove, update } from "../controllers/projectController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/new", authMiddleware, create);
router.route("/:id").delete(authMiddleware, remove).post(authMiddleware, update).get(getProject);
router.route("/:id?").get(getAllProjects);

export default router;