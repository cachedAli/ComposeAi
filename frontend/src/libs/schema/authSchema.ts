import { z } from "zod";

export const signupSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name too long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name too long"),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters.")
})

export const signinSchema = z.object({
    email: z.string().trim().email("Invalid email address."),
    password: z.string().min(1, "Password is required.")
})

export const forgotPasswordSchema = z.object({
    email: z.string().trim().email("Invalid email address."),
})

export const resetPasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z
        .string()
        .min(1, "Please confirm your password.")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});