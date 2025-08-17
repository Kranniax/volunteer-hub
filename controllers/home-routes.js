import { Router } from "express";
import {
  Opportunity,
  Organization,
  Signup,
  Volunteer,
} from "../models/index.js";
import { loggedInAuth, withAuth } from "../utils/auth.js";

const router = Router();
// render all volunteer opportunites
router.get("/", async (req, res) => {
  try {
    const dbOpportunities = await Opportunity.findAll();
    const opportunities = dbOpportunities.map((opportunity) =>
      opportunity.get({ plain: true })
    );
    // console.log(req.session);

    res.render("home", {
      opportunities,
      loggedIn: req.session.loggedIn,
      role: req.session.role,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// render all volunteer opportunities
router.get("/opportunities", async (req, res) => {
  try {
    const dbOpportunities = await Opportunity.findAll({
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: ["name"],
          order: [["createdAt", "DESC"]],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    const opportunities = dbOpportunities.map((opportunity) =>
      opportunity.get({ plain: true })
    );
    res.render("opportunities", {
      opportunities,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
// render a single volunteer opportunity
router.get("/opportunities/:id", async (req, res) => {
  try {
    const dbOpportunityData = await Opportunity.findByPk(req.params.id, {
      include: [
        {
          model: Volunteer,
          through: Signup,
        },
        {
          model: Organization,
          as: "organization",
          attributes: ["name"],
        },
      ],
    });

    if (!dbOpportunityData) {
      res
        .status(404)
        .json({ message: "Cannot locate opportunity with this id" });
      return;
    }
    const opportunity = dbOpportunityData.get({ plain: true });
    // console.log(opportunity);
    
    res.render("single-opportunity", {
      opportunity,
      loggedIn: req.session.loggedIn,
      loggedInUserId: req.session.user_id,
      loggedInRole: req.session.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// render volunteer creation page
router.get("/volunteer-profile", withAuth, loggedInAuth, (req, res) => {
  res.render("volunteer-profile", { loggedIn: req.session.loggedIn });
});

// render organization creation page
router.get("/organization-profile", withAuth, (req, res) => {
  res.render("organization-profile", { loggedIn: req.session.loggedIn });
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
