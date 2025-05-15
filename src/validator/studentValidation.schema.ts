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

export const studentQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .refine((val) => !val || /^[1-9]\d*$/.test(val), {
        message: "Page must be a positive integer",
      }),

    limit: z
      .string()
      .optional()
      .refine((val) => !val || /^[1-9]\d*$/.test(val), {
        message: "Limit must be a positive integer",
      }),
    department: z.string().optional(),
  }),
});

const studentUpdateBodySchema = studentValidationSchema.shape.body.partial();

export const studentUpdateValidationSchema = z.object({
  params: studentIdValidationSchema.shape.params,
  body: studentUpdateBodySchema,
});


export type StudentQueryType = z.infer<typeof studentQuerySchema>["query"];
export type StudentId = z.infer<typeof studentIdValidationSchema>["params"];
export type StudentType = z.infer<typeof studentValidationSchema>["body"];
