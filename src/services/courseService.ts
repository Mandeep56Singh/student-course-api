import { Types } from "mongoose";
import Course from "../models/course.model.js";
import { NotFoundError } from "../utils/error.js";
import { CourseType } from "../validator/courseValidation.schema.js";

export const getAllCourses = async () => {
  return Course.find(); // Fetch all courses
};

export const createCourse = async (data: CourseType) => {
  const { title, description, credits } = data;

  const newCourse = new Course({ title, description, credits });
  return newCourse.save(); 
};


export const updateCourse = async (
  id: string,
  data: Partial<CourseType>
) => {
  // Check if the course exists
  const course = await Course.findById(id);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  // Update course fields
  course.title = data.title || course.title;
  course.description = data.description || course.description;
  course.credits = data.credits || course.credits;

  return course.save(); 
};

export const deleteCourse = async (id: string) => {
  // Check if the course exists
  const course = await Course.findById(id);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  return Course.deleteOne({ _id: id }); 
};
