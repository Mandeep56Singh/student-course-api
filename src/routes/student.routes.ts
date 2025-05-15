import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from "../controllers/studentController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  studentIdValidationSchema,
  studentQuerySchema,
  studentUpdateValidationSchema,
  studentValidationSchema,
} from "../validator/studentValidation.schema.js";

export const studentRouter = Router();

studentRouter.get("/", validateRequest(studentQuerySchema), getStudents);
studentRouter.get(
  "/:id",
  validateRequest(studentIdValidationSchema),
  getStudentById
);
studentRouter.post(
  "/",
  validateRequest(studentValidationSchema),
  createStudent
);
studentRouter.patch(
  "/:id",
  validateRequest(studentUpdateValidationSchema),
  updateStudent
);
studentRouter.delete(
  "/:id",
  validateRequest(studentIdValidationSchema),
  deleteStudent
);
