import express from "express"
import { googleOAuthCallback, saveToken } from "../controller/oauth.controller.js";

const oauthRouter = express.Router();

oauthRouter.get("/google/callback", googleOAuthCallback)

oauthRouter.post("/save-token", saveToken);


export default oauthRouter;