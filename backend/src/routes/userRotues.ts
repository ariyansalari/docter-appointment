import { Router } from "express";
import {
  bookAppointment,
  cancelAppointment,
  getProfile,
  listAppointments,
  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/userContorller.js";
import { authUser } from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-profile", authUser, getProfile);
router.post("/update-profile", upload.single("image"), authUser, updateProfile);
router.post("/book-appointment", authUser, bookAppointment);
router.get("/appointments", authUser, listAppointments);
router.post("/cancel-appointment", authUser, cancelAppointment);
export default router;
