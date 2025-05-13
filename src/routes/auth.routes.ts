import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import {
  AuthenticatedRequest,
  authMiddleware,
} from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { userValidationSchema } from "../validator/userValidation.schema.js";

export const authRouter = Router();

authRouter.post("/register", validateRequest(userValidationSchema), register);
authRouter.post("/login", validateRequest(userValidationSchema), login);

authRouter.get(
  "/test-auth",
  authMiddleware,
  (req: AuthenticatedRequest, res) => {
    res.json({
      message: "You are authenticated ✅",
      user: req.user,
    });
  }
);
