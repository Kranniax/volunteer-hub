import { Router } from "express";
import userRoutes from "./user-route.js";
import volunteerRoutes from "./volunteer-route.js";
import organizationRoutes from "./organization-route.js";
import volunteerOpportunityRoutes from "./volunteer-opportunity-route.js";
import volunteerOpportunitSignUpRoutes from "./volunteer-opportunity-signup-routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/volunteers", volunteerRoutes);
router.use("/organizations", organizationRoutes);
router.use("/opportunities", volunteerOpportunityRoutes);
router.use("/signups", volunteerOpportunitSignUpRoutes);

export default router;
