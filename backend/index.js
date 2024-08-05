// library imports
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

// file imports
import router from "./routes/index.js";
import { DEFAULT_PROFILE_PIC, FRONTEND_URL, PORT } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const __dirname = path.resolve();

// config
dotenv.config({ path: path.resolve(__dirname, "backend/config/.env") });

const app = express();

// database connection
connectToDB();

// middlewares
app.use(cors({
    origin: [FRONTEND_URL, DEFAULT_PROFILE_PIC],
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1", router);

// static files
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// serve index.html
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

// error handling middleware
app.use(errorMiddleware);