import express from "express"
import { editMessage, handleChatMessage, refineMessage, sendEmail } from "../controller/chat.controller.js";
import { upload } from "../libs/multer.js";


const router = express.Router();

router.post("/message", upload.single("file"), handleChatMessage);
router.put("/edit-message", editMessage);
router.post("/refine-message", refineMessage);
router.post("/send-email", sendEmail)



export default router;