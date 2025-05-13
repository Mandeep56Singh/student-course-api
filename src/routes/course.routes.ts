import { Router } from "express";
import * as courseController from "../controllers/courseController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  courseIdValidationSchema,
  courseValidationSchema,
} from "../validator/courseValidation.schema.js";
export const courseRouter = Router();

courseRouter.post(
  "/create",
  validateRequest(courseValidationSchema),
  courseController.createCourse
);

courseRouter.post(
  "/update/:id",
  validateRequest(courseIdValidationSchema),
  courseController.updateCourse
);

courseRouter.post(
  "/delete/:id",
  validateRequest(courseIdValidationSchema),
  courseController.deleteCourse
);

courseRouter.get("/getAll", courseController.getCourses);
