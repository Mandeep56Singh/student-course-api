import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { userValidationSchema } from "../validator/userValidation.schema.js";

export const authRouter = Router();

authRouter.post("/register", validateRequest(userValidationSchema), register);
authRouter.post("/login", validateRequest(userValidationSchema), login);
