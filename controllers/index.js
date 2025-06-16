import { Router } from "express";
import apiRoutes from "./api/index.js";
import homeRoutes from "./home-routes.js";
// import dashboardRoutes from './dashboard-routes.js';

const router = Router();

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
// router.use("/dashboard", dashboardRoutes);

export default router;
