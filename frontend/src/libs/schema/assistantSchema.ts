import { z } from "zod";

export const sendEmailSchema = z.object({
    emailFrom: z.string().trim().email("Invalid email address."),
    emailTo: z.string().trim().email("Invalid email address."),
})