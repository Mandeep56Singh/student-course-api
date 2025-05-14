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
  studentUpdateValidationSchema,
  studentValidationSchema,
} from "../validator/studentValidation.schema.js";

export const studentRouter = Router();

studentRouter.get("/", getStudents);
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
studentRouter.put(
  "/:id",
  validateRequest(studentUpdateValidationSchema),
  updateStudent
);
studentRouter.delete(
  "/:id",
  validateRequest(studentIdValidationSchema),
  deleteStudent
);
