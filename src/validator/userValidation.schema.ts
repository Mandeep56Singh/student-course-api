import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, "email is required")
      .email("Please enter valid email"),
    password: z.string().min(6, "password must be 6 digit"),
  }),
});

export type UserType = z.infer<typeof userValidationSchema>;
