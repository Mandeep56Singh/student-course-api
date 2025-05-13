import { z } from "zod";
export const courseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    credits: z.number().min(1, "credits are required"),
  }),
});
export const courseIdValidationSchema = z.object({
  params: z.object({
    id: z
      .string()
      .length(24, { message: "Invalid ID length" }) // ObjectId is 24 hex chars
      .regex(/^[a-f\d]{24}$/i, { message: "Invalid MongoDB ObjectId" }),
  }),
});
export type CourseId = z.infer<typeof courseIdValidationSchema>["params"]
export type CourseType = z.infer<typeof courseValidationSchema>["body"];
