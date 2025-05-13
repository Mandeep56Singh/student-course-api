import express from "express";
import { connectDB } from "./config/connect.js";
import { authRouter } from "./routes/auth.routes.js";
import cookieParser from 'cookie-parser'
const PORT = process.env.PORT || 300

const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
// routes 
app.use("/auth", authRouter)

connectDB()
app.listen(PORT, () => console.log("Server running at port:", PORT))
