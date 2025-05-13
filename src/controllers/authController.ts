import { Request, Response } from "express";
import { loginService, registerService } from "../services/authService.js";
import { BadRequestError, NotFoundError } from "../utils/error.js";
import { UserType } from "../validator/userValidation.schema.js";

export const register = async (
  req: Request<{}, {}, UserType["body"]>,
  res: Response
): Promise<void> => {
  console.log("request hit at regsiter controller");
  try {
    await registerService(req.body);

    res.status(201).json("User Registered Successfully");
  } catch (err: any) {
    if (err instanceof BadRequestError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: err.message });
  }
};

export const login = async (
  req: Request<{}, {}, UserType["body"]>,
  res: Response
): Promise<void> => {
  console.log("request hit at login controller");
  try {
    const token = await loginService(req.body);

    res.status(200).json({
      message: "Login Successfull",
      token: token,
    });

  } catch (err: any) {
    console.error("Catch error", err);
    if (err instanceof BadRequestError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    if (err instanceof NotFoundError) {
      res.status(err.statusCode).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

