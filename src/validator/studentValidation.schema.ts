import { z } from "zod";

export const studentValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    age: z.number().int().min(0),
    department: z.string().min(1, "Department is required"),
    addmissionDate: z
      .string()
      .transform((val) => new Date(val))
      .refine((val) => !isNaN(val.getTime()), { message: "Invalid date" }),
    enrolledCourse: z
      .array(
        z
          .string()
          .length(24)
          .regex(/^[a-f\d]{24}$/i, "Invalid Course ID")
      )
      .optional(),
  }),
});

export const studentIdValidationSchema = z.object({
  params: z.object({
    id: z
      .string()
      .length(24, { message: "Invalid ID length" })
      .regex(/^[a-f\d]{24}$/i, { message: "Invalid MongoDB ObjectId" }),
  }),
});


export const studentUpdateValidationSchema = studentIdValidationSchema.merge(
    z.object({body: studentValidationSchema})
)

export type StudentId = z.infer<typeof studentIdValidationSchema>["params"];
export type StudentType = z.infer<typeof studentValidationSchema>["body"];
