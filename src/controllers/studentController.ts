import { Request, Response } from "express";
import * as studentService from "../services/studentService.js";
import { NotFoundError } from "../utils/error.js";
import {
  StudentId,
  StudentType,
} from "../validator/studentValidation.schema.js";

export const getStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentById = async (
  req: Request<StudentId>,
  res: Response
): Promise<void> => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    res.status(200).json(student);
  } catch (err: any) {
    if (err instanceof NotFoundError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: err.message });
  }
};

export const createStudent = async (
  req: Request<{}, {}, StudentType>,
  res: Response
): Promise<void> => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStudent = async (
  req: Request<StudentId, {}, Partial<StudentType>>,
  res: Response
): Promise<void> => {
  try {
    const updated = await studentService.updateStudent(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err: any) {
    if (err instanceof NotFoundError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: err.message });
  }
};

export const deleteStudent = async (
  req: Request<StudentId>,
  res: Response
): Promise<void> => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err: any) {
    if (err instanceof NotFoundError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: err.message });
  }
};
