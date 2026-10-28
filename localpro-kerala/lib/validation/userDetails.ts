import { z } from "zod";

/** Shared email pattern used by both client-side and server-side validation. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const userDetailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .regex(EMAIL_PATTERN, "Please enter a valid email address"),
});

export type UserDetailsFormData = z.infer<typeof userDetailsSchema>;
