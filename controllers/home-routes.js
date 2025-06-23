import { Router } from "express";
import { Opportunity } from "../models/index.js";

const router = Router();
// render all volunteer opportunites
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

// render all volunteer opportunities
router.get("/opportunities", async (req, res) => {
  try {
    const dbOpportunities = await Opportunity.findAll();
    const opportunities = dbOpportunities.map((opportunity) =>
      opportunity.get({ plain: true })
    );
    res.render("opportunities", { opportunities, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
router.get("/opportunities/:id", async (req, res) => {
  try {
    const dbOpportunityData = await Opportunity.findByPk(req.params.id);

    if (!dbOpportunityData) {
      res
        .status(404)
        .json({ message: "Cannot locate opportunity with this id" });
      return;
    }
    const opportunity = dbOpportunityData.get({ plain: true });
    res.render("single-opportunity", {
      opportunity,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// render login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
// render signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});
// render about page
router.get("/about", (req, res) => {
  res.render("about", { loggedIn: req.session.loggedIn });
});

export default router;
