import { Router } from "express";
import Admin from './adminRoutes.js';
const router = Router();
router.use('/admin', Admin);
export default router;
