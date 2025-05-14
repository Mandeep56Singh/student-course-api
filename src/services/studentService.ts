import Student from "../models/student.model.js";
import { NotFoundError } from "../utils/error.js";
import { StudentType } from "../validator/studentValidation.schema.js";

export const getAllStudents = async () => {
  return Student.find().populate("enrolledCourse");
};

export const getStudentById = async (id: string) => {
  const student = await Student.findById(id).populate("enrolledCourse");
  if (!student) throw new NotFoundError("Student not found");
  return student;
};

export const createStudent = async (data: StudentType) => {
  const newStudent = new Student(data);
  return newStudent.save();
};

export const updateStudent = async (id: string, data: Partial<StudentType>) => {
  const student = await Student.findById(id);
  if (!student) throw new NotFoundError("Student not found");

  Object.assign(student, data);
  return student.save();
};

export const deleteStudent = async (id: string) => {
  const student = await Student.findById(id);
  if (!student) throw new NotFoundError("Student not found");

  return Student.deleteOne({ _id: id });
};
