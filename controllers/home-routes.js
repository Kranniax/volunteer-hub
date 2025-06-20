import { Router } from "express";
import { Opportunity } from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const dbOpportunities = await Opportunity.findAll();
    const opportunities = dbOpportunities.map((opportunity) =>
      opportunity.get({ plain: true })
    );
    // console.log(req.session);

    res.render("home", { opportunities, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/about", (req, res) => {
  res.render("about");
});

export default router;
