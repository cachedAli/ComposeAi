import { z } from "zod";

export const sendEmailSchema = z.object({
    emailTo: z.string().trim().email("Invalid email address."),
})