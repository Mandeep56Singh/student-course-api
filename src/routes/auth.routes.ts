import { Router } from "express";
import { register } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { userValidationSchema } from "../validator/userValidation.schema.js";

export const authRouter  = Router()

authRouter.post("/register",validateRequest(userValidationSchema), register )