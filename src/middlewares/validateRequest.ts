import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
     
      next();
    } catch (err) {
        console.error("Caught error:", err);
      if (err instanceof ZodError) {
        res.status(400).json({
          success: false,
          errors: err.errors,
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
      return;
    }
  };
