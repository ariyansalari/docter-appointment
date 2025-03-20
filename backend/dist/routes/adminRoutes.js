import { Router } from "express";
import upload from "../middlewares/multer.js";
import { addDoctor } from "../controllers/adminController.js";
const router = Router();
router.post("/add-doctor", upload.single("image"), addDoctor);
export default router;
