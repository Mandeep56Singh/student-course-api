import express from "express";
import { connectDB } from "./config/connect.js";

const PORT = process.env.PORT || 300

const app = express()

connectDB()
app.listen(PORT, () => console.log("Server running at port:", PORT))
