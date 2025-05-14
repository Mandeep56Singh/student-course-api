import { Request, Response } from "express";
import * as courseService from "../services/courseService.js";
import { NotFoundError } from "../utils/error.js";
import {
  CourseId,
  CourseSearchQueryType,
  CourseType,
} from "../validator/courseValidation.schema.js";

// Get all courses
export const getCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new course
export const createCourse = async (
  req: Request<{}, {}, CourseType>,
  res: Response
): Promise<void> => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing course
export const updateCourse = async (
  req: Request<CourseId, {}, Partial<CourseType>>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedCourse = await courseService.updateCourse(id, data);
    res.status(200).json(updatedCourse);
  } catch (err: any) {
    if (err instanceof NotFoundError) {
      res.status(err.statusCode).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

// Delete a course
export const deleteCourse = async (
  req: Request<CourseId>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await courseService.deleteCourse(id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err: any) {
    if (err instanceof NotFoundError) {
      res.status(err.statusCode).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

// Search a course

export const searchCourse = async (
  req: Request<{}, {}, {}, CourseSearchQueryType>,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.query;
    const courses = await courseService.searchCourse(title);
    res.status(200).json({
      data: courses,
      message: "Course Found",
    });
  } catch (err: any) {
    if (err instanceof NotFoundError) {
      res.status(err.statusCode).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};
