import { Router } from "express";
import Admin from "./adminRoutes.js";
import Doctor from "./doctorRoutes.js";
import User from "./userRotues.js";

const router = Router();

router.use("/admin", Admin);
router.use(Doctor);
router.use("/user", User);

export default router;
