import { z } from "zod";

export const userSignupSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});
