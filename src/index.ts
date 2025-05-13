import cookieParser from "cookie-parser";
import express from "express";
import { connectDB } from "./config/connect.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { authRouter } from "./routes/auth.routes.js";
import { courseRouter } from "./routes/course.routes.js";
const PORT = process.env.PORT || 300;

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/auth", authRouter);
app.use("/course", authMiddleware, courseRouter);

connectDB();
app.listen(PORT, () => console.log("Server running at port:", PORT));
