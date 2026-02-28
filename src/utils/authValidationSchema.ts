// utils/validationSchema.ts
import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),

  confirmPassword: z.string()
})
.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      path: ["confirmPassword"],
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
    });
  }
});

export type SignUpFormData = z.infer<typeof signUpSchema>;



export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Invalid email or password")
    .max(100, "Password is too long"),
});

export type SignInFormData = z.infer<typeof signInSchema>;



export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;