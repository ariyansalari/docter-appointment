import { Router } from "express";
import upload from "../middlewares/multer.js";
import { addDoctor, loginAdmin } from "../controllers/adminController.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const router = Router();

router.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
router.post("/login", loginAdmin);

export default router;
