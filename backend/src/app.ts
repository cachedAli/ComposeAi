import express from "express";
import cors from "cors"
import router from "./routes/chat.route";

const app = express()

app.use(express.json());
app.use(cors());

const chatRoutes = router;

app.get("/", (req, res) => {
    res.send("Hi amigo")
})

app.use("/api/chat", chatRoutes)



export default app;