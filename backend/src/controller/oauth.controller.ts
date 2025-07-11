import { google } from "googleapis";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { supabase } from "../libs/supabaseClient.js";

dotenv.config()

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

export const googleOAuthCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;

    if (!code) {
        res.status(400).send("Missing code")
        return
    };

    try {
        const { tokens } = await oauth2Client.getToken(code);

        const { access_token, refresh_token, id_token } = tokens;

        // Decode email from id_token
        const ticket = await oauth2Client.verifyIdToken({
            idToken: id_token!,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload?.email;

        res.redirect(`${process.env.CLIENT_URL}/oauth/success?email=${email}&refresh_token=${refresh_token}`);
    } catch (err) {
        console.error("OAuth error", err);
        res.status(500).send("Something went wrong with Google OAuth.");
    }
};

export const saveToken = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        res.status(401).send("Missing Supabase token");
        return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser(token);

    if (userError || !userData?.user) {
        res.status(401).send("Unauthorized");
        return;
    }

    const { email, refresh_token } = req.body;

    if (!email || !refresh_token) {
        res.status(400).send("Missing email or refresh token");
        return;
    }

    const { error } = await supabase
        .from("gmail_tokens")
        .upsert(
            {
                user_id: userData.user.id,
                email,
                refresh_token,
            },
            {
                onConflict: "user_id", // This requires user_id to be a UNIQUE key in your table
            }
        );

    if (error) {
        console.error(error);
        res.status(500).send("Failed to save token");
        return;
    }

    await supabase.auth.admin.updateUserById(userData.user.id, {
        user_metadata: { hasConnectedGmail: true },
    });

    res.send("✅ Token saved");
};
