import { Router } from "express";
import upload from "../middlewares/multer.js";
import {
  addDoctor,
  allDoctors,
  loginAdmin,
} from "../controllers/adminController.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { changeAvailabilty } from "../controllers/dcotorContoller.js";

const router = Router();

router.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
router.post("/login", loginAdmin);
router.get("/all-doctors", authAdmin, allDoctors);
router.put("/change-avalibility/:id", authAdmin, changeAvailabilty);

export default router;
