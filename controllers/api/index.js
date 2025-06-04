import { Router } from "express";
import userRoutes from "./user-route.js";
import volunteerRoutes from "./volunteer-route.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/volunteers", volunteerRoutes);

export default router;
