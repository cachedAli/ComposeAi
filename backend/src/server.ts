import dotenv from "dotenv";
import app from "./app.js"
import { getGeminiModel } from "./libs/gemini.js";
import { systemInstructions } from "./config/systemPrompts.js";

dotenv.config()


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`)
})


const run = async () => {
    try {
        const modal = getGeminiModel();

        const chat = modal.startChat({
            history: [systemInstructions],
        })

        const result = chat.sendMessage("Whats your opinion about linkedin cold dms and emails and stuff");
        const response = (await result).response;

        console.log("All Response", response)

        console.log("Gemini Response:\n", response.text());
    } catch (err) {
        console.error("❌ Error:", err);
    }
}

// run()