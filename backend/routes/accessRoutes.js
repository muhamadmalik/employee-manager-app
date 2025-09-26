import express from "express";
import multer from "multer";
import { simulateAccess } from "../controllers/accessController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/simulate", upload.single("file"), simulateAccess);

export default router;