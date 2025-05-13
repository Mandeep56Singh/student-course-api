import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import userModel, { IUSer } from "../models/user.model.js";
import { registerService } from "../services/registerService.js";
import { BadRequestError } from "../utils/error.js";
import { UserType } from "../validator/userValidation.schema.js";

export const register = async (
  req: Request<{}, {}, UserType["body"]>,
  res: Response
): Promise<void> => {
    console.log("request hit at regsiter controller")
  try {
    await registerService(req.body);

    res.status(201).json("User Registered Successfully");
  } catch (err: any) {
    if (err instanceof BadRequestError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({message: err.message})
  }
};
