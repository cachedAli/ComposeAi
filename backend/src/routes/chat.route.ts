import express from "express"
import { editMessage, handleChatMessage } from "../controller/chat.controller.js";
import { upload } from "../libs/multer.js";


const router = express.Router();

router.post("/message", upload.single("file"), handleChatMessage);
router.put("/edit-message", editMessage);


export default router;