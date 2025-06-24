import { allowContactInfo } from "./constants.js";

export function sanitizeResumeText(fileText: string, prompt: string) {
    const allow = allowContactInfo(prompt.trim())
    if (allow) return fileText;

    return fileText
        .replace(/(\+92|\+1)?[0-9\- ]{9,}/gi, "") // Remove phone numbers
        .replace(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi, "") // Remove emails
        .replace(/linkedin\.com\/in\/[a-z0-9-]+/gi, "") // Remove LinkedIn
        .replace(/github\.com\/[a-z0-9-]+/gi, ""); // Optional: remove GitHub
}