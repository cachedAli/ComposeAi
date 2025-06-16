import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();


const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const getGeminiModel = () => {
    return genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
};