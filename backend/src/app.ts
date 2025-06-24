import express from "express";
import cors from "cors"
import router from "./routes/chat.route.js";
import oauthRouter from "./routes/oauth.route.js";

const app = express()

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

const chatRoutes = router;
const oauthRoutes = oauthRouter;


app.get("/", (req, res) => {
    res.send("Hi amigo")
})

app.use("/api/chat", chatRoutes)
app.use("/api/oauth", oauthRoutes)




export default app;