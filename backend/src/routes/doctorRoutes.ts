import { Router } from "express";
import { doctorList } from "../controllers/dcotorContoller.js";

const router = Router();

router.get("/doctor/list", doctorList);

export default router;
