import { Router } from "express";
import * as courseController from "../controllers/courseController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  courseIdValidationSchema,
  courseSearchValidationSchema,
  courseUpdateValidationSchema,
  courseValidationSchema,
} from "../validator/courseValidation.schema.js";

export const courseRouter = Router();

// GET /courses – List all courses
courseRouter.get("/", courseController.getCourses);

// POST /courses – Create a new course
courseRouter.post(
  "/",
  validateRequest(courseValidationSchema),
  courseController.createCourse
);

// PUT /courses/:id – Update course
courseRouter.put(
  "/:id",
  validateRequest(courseUpdateValidationSchema),
  courseController.updateCourse
);

// DELETE /courses/:id – Delete course
courseRouter.delete(
  "/:id",
  validateRequest(courseIdValidationSchema),
  courseController.deleteCourse
);

// SEARCH /courses/search?title=abc

courseRouter.get(
  "/search",
  validateRequest(courseSearchValidationSchema),
  courseController.searchCourse
)