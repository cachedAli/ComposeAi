import { google } from "googleapis";
import { Buffer } from "buffer";

export const sendEmailUsingGmail = async ({
    to,
    subject,
    html,
    userEmail,
    refreshToken,
    attachment, 
}: {
    to: string;
    subject: string;
    html: string;
    userEmail: string;
    refreshToken: string;
    attachment?: {
        filename: string;
        content: Buffer;
        contentType: string;
    } | undefined;
}) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL
    );

    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    let rawMessage = "";

    if (attachment) {
        // MIME email with attachment
        const boundary = "__my_boundary__";

        rawMessage = [
            `From: ${userEmail}`,
            `To: ${to}`,
            `Subject: ${subject}`,
            `MIME-Version: 1.0`,
            `Content-Type: multipart/mixed; boundary="${boundary}"`,
            ``,
            `--${boundary}`,
            `Content-Type: text/html; charset="UTF-8"`,
            `Content-Transfer-Encoding: 7bit`,
            ``,
            html,
            ``,
            `--${boundary}`,
            `Content-Type: ${attachment.contentType}`,
            `Content-Disposition: attachment; filename="${attachment.filename}"`,
            `Content-Transfer-Encoding: base64`,
            ``,
            attachment.content.toString("base64"),
            `--${boundary}--`,
        ].join("\n");
    } else {
        // Simple email without attachment
        rawMessage = [
            `From: ${userEmail}`,
            `To: ${to}`,
            `Subject: ${subject}`,
            "Content-Type: text/html; charset=utf-8",
            "",
            html,
        ].join("\n");
    }

    const encodedMessage = Buffer.from(rawMessage)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    const response = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
            raw: encodedMessage,
        },
    });

    console.log("✅ Email sent via Gmail API");
    return response;
};
