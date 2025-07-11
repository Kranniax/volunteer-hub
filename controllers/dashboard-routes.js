import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("dashboard", {loggedIn: req.session.loggedIn});
});

export default router;
