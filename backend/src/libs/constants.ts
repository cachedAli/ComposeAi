export const mentionsAttachmentKeywords = [
    // General attachment verbs
    "attach", "attached", "attachment", "i've attached", "i have attached", "attaching",
    "enclosed", "included", "added", "appended", "uploaded", "pasted",

    // Resume/CV mentions
    "resume attached", "cv attached", "attaching my resume", "attaching my cv",
    "attached my resume", "attached my cv", "sending my resume", "sending my cv",
    "here's my resume", "here is my resume", "my resume is attached", "my cv is attached",
    "attached my details", "attached my profile", "resume enclosed", "cv enclosed",
    "i've added my resume", "added my resume",

    // File mentions
    "sending file", "attached file", "sending this file", "attached this file",
    "file is included", "file is attached", "with this file", "added the file",
    "uploaded my file", "uploading my file", "file enclosed", "please find the file",
    "see attached file", "file is below", "included file", "file attached",

    // Image-specific mentions
    "sending image", "attached image", "image attached", "take a look at this image",
    "check this image", "see the picture", "picture attached", "sending a photo",
    "attached a photo", "photo attached", "see the photo", "this image",
    "screenshot attached", "sharing an image", "sending pic", "attached pic",
    "check out this pic", "image below", "image is attached", "pic added",
    "attached screenshot", "image included", "image file included",

    // Informal or Gen Z expressions
    "dropping my resume", "yo resume below", "sending it here", "resume down here",
    "resume in here", "here ya go", "throwing in my resume", "just tossed my resume",
    "resume dropped", "added my stuff", "sending stuff", "sending docs", "file's in",
    "dropped my file", "i dropped it", "slapped my resume", "resume posted",
    "dropping this", "take a look at this", "check this out", "sending this to you",

    // Polite/formal phrasing
    "please see attached", "please find attached", "you will find attached",
    "i've included my resume", "included for your review", "attached herewith",
    "resume is enclosed", "document is attached", "my resume is enclosed",
];



const contactKeywords = [
    "add my contact",
    "use my contact",
    "include my contact",
    "include my linkedin",
    "add my linkedin",
    "use my linkedin",
    "attach my linkedin",
    "include my github",
    "add my github",
    "use my github",
    "include my email",
    "add my email",
    "use my email",
    "include my phone",
    "add my phone",
    "use my phone",
    "add my number",
    "use my number",
    "include my number",
    "add my contact info",
    "use my contact info",
    "include my contact info",
    "include contact info",
    "add contact info",
    "use contact info",
    "keep contact info",
    "don’t remove contact"
];

export const allowContactInfo = (prompt: string) => {
    return contactKeywords.some(phrase => prompt.toLowerCase().includes(phrase));
};

const subjectRegex = /^Subject:\s.+/im;
export const isEmail = (txt: string) => {
    return subjectRegex.test(txt)
}