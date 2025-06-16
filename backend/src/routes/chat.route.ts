import express from "express"
import { handleChatMessage } from "../controller/chat.controller.js";
import { upload } from "../libs/multer.js";


const router = express.Router();

router.post("/message", upload.single("file"), handleChatMessage);

export default router;