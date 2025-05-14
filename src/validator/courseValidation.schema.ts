import { z } from "zod";

export const courseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(20, "Description must be 20 digits long"),
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

export const courseUpdateValidationSchema = courseIdValidationSchema.merge(
  z.object({
    body: courseValidationSchema
  })
)
export const courseSearchValidationSchema = z.object({
  query: z.object({
     title: z.string().min(1, "Title is required"),
  })
})
export type CourseSearchQueryType = z.infer<typeof courseSearchValidationSchema>["query"]
export type CourseId = z.infer<typeof courseIdValidationSchema>["params"]
export type CourseType = z.infer<typeof courseValidationSchema>["body"];
