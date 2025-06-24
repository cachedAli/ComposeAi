import pdfParse from "pdf-parse-fork"
import { sanitizeResumeText } from "../libs/sanitizeResumeText.js";
import { mentionsAttachmentKeywords } from "../libs/constants.js";

export const systemInstructions = {
    role: "system",
    parts: [{
        text: `
You are a professional AI email assistant.

Your job is to help users write emails that are clear, respectful, and sound natural — like they were written by a human, not by an AI. Avoid robotic or overly generic responses. Instead, write in a way that feels personal, natural, and professional.

RULES:
- Write a fully sendable email. It must look like a real person wrote it.
- If the user provides their resume or job info, use it. Do NOT ask questions or add placeholders unless there is no information available.
- Do NOT include the user's name in the subject line.
- Do NOT add the user's phone number, email, LinkedIn, or other personal info unless the user includes it or explicitly asks.
- Do NOT say "my resume is attached", "please find my resume", "I’ve attached the file", or anything similar unless the user explicitly asks to attach, send, or include the file. This applies to any uploaded files such as resumes, CVs, PDFs, or documents.
- If placeholders like [Company Name] are absolutely required, use them sparingly and clearly.
- Never include asterisks (*), markdown formatting, or any commentary. Only return the plain email content.
- Do not say "Here's your email" or "Hope this helps" — just output the email directly.

Default tone should be professional but warm and approachable — not too stiff or too casual.

If the user’s prompt has very little detail, you can make a safe and realistic guess or use minimal placeholders.

EXAMPLES:
---
Subject: Application for Frontend Developer Role

Dear [Company Name] Hiring Team,

I'm writing to express my interest in the Frontend Developer role. With hands-on experience in React, Node.js, and Tailwind CSS, I've built scalable and responsive web applications...

Sincerely,  
Mohammad Ali
---

Always follow proper structure, grammar, and etiquette for emails. If the user provides context or a draft, help improve or complete the email based on that.

If the user asks something unrelated to writing emails, politely respond that you can only help with email writing tasks.
    `.trim()
    }]
};

export const refineMessagePrompt = (action: string, originalText: string) => {
    return `The user wants to ${action} the following email.

Email:
"""
${originalText}
"""

Only return the rewritten email. Do not explain or confirm anything.`.trim();
}

export const buildFinalPrompt = async ({
    prompt,
    file,
}: {
    prompt: string;
    file?: Express.Multer.File;
}) => {
    let finalPrompt = prompt.trim();
    let fileText = "";

    const fileType = file?.mimetype || "";
    const fileName = file?.originalname?.toLowerCase() || "";
    const isPDF = fileType === "application/pdf";
    const isImage = fileType.startsWith("image/");
    const looksLikeResume = fileName.includes("resume") || fileName.includes("cv");

    const lowercasePrompt = prompt.toLowerCase();
    const mentionsAttachment = mentionsAttachmentKeywords.some((phrase) =>
        lowercasePrompt.includes(phrase)
    );
    const mentionsPersonalization =
        lowercasePrompt.includes("personalize") || lowercasePrompt.includes("use my resume");

    let shouldPersonalizeFromFile = false;

    if (file) {
        if (isPDF) {
            const pdfData = await pdfParse(file.buffer);
            fileText = pdfData.text.slice(0, 8000);
        }

        if (mentionsPersonalization || (looksLikeResume && isPDF)) {
            shouldPersonalizeFromFile = true;
        }

        if (mentionsAttachment && !shouldPersonalizeFromFile) {
            const label = isImage ? "an image file" : isPDF ? "a document" : "a file";

            finalPrompt += `

The user wants to attach ${label} named "${file.originalname}" with this email.
Do not personalize the email using the file contents unless explicitly asked.`;
        }

        if (
            !mentionsAttachment &&
            !mentionsPersonalization &&
            prompt.length < 50 &&
            isPDF &&
            fileText.length > 100
        ) {
            shouldPersonalizeFromFile = true;
        }

        if (isImage && lowercasePrompt.includes("pic")) {
            finalPrompt += `

The user has attached an image (${file.originalname}). Do not refer to it as a resume or document.`;
        }

        if (shouldPersonalizeFromFile) {
            const safeFileText = sanitizeResumeText(fileText, prompt);

            finalPrompt += `

The user has provided a file named "${file.originalname}" to help personalize the email.
Below is the content of the file (do not mention it is attached unless the user asked to attach it):

---------------- FILE CONTENT START ----------------
${safeFileText}
----------------- FILE CONTENT END -----------------

Please use this content to make the email more personalized and professional.`;
        }
    }

    return finalPrompt;
};

