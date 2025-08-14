import { Router } from "express";
import {
  User,
  Volunteer,
  Opportunity,
  Signup,
  Organization,
} from "../models/index.js";
import { withAuth } from "../utils/auth.js";

const router = Router();

// Get loggedIn user profile
router.get("/", withAuth, async (req, res) => {
  try {
    if (req.session.role === "volunteer") {
      const profileResponse = await User.findOne({
        where: {
          id: req.session.user_id,
        },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Volunteer,
            as: "volunteerProfile",
            include: [
              {
                model: Opportunity,
                through: Signup, // hides join table fields if you want
                // order: [["createdAt", "DESC"]],
                attributes: [
                  "id",
                  "organization_id",
                  "title",
                  "description",
                  "date",
                ],
                include: [
                  {
                    model: Organization,
                    as: "organization", // use the alias from your association
                    attributes: ["id", "name"],
                  },
                ],
              },
            ],
          },
        ],
        order: [
          [
            { model: Volunteer, as: "volunteerProfile" },
            { model: Opportunity, as: "opportunities" },
            "createdAt",
            "DESC",
          ],
        ],
      });
      if (!profileResponse) {
        res.status(404).json({ message: "Cannot locate this user" });
        return;
      }
      // res.status(200).json(profileResponse);
      const { volunteerProfile, ...extra } = profileResponse.get({
        plain: true,
      });
      res.render("dashboard", {
        volunteerProfile,
        opportunities: volunteerProfile.opportunities,
        loggedIn: req.session.loggedIn,
        role: req.session.role,
        extra,
      });
    } else {
      const profileResponse = await User.findOne({
        where: {
          id: req.session.user_id,
        },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Organization,
            as: "organizationProfile",
            include: [
              {
                model: Opportunity,
                as: "opportunities",
                attributes: ["id", "title", "description", "date"],
              },
            ],
          },
        ],
        order: [
          [
            { model: Organization, as: "organizationProfile" },
            { model: Opportunity, as: "opportunities" },
            "createdAt",
            "DESC",
          ],
        ],
      });
      if (!profileResponse) {
        res.status(404).json({ message: "Cannot locate this organization" });
        return;
      }
      const { organizationProfile, ...extra } = profileResponse.get({
        plain: true,
      });
      res.render("dashboard", {
        organizationProfile,
        postedOpportunities: organizationProfile.opportunities,
        loggedIn: req.session.loggedIn,
        role: req.session.role,
        extra,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// edit volunteer profile
router.get("/edit-volunteer-profile", withAuth, async (req, res) => {
  try {
    const profileResponse = await Volunteer.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!profileResponse) {
      res.status(404).json({ message: "Cannot locate volunteer profile" });
      return;
    }
    const profile = profileResponse.get({ plain: true });
    res.render("edit-volunteer-profile", {
      volunteer: profile,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// edit a organization profile
router.get("/edit-organization-profile", withAuth, async (req, res) => {
  try {
    const profileResponse = await Organization.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!profileResponse) {
      res.status(404).json({ message: "Cannot locate organization profile" });
      return;
    }

    // res.json(profileResponse);
    const profile = profileResponse.get({ plain: true });
    res.render("edit-organization-profile", {
      organization: profile,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// post a new volunteer
router.get("/opportunities/new", withAuth, async (req, res) => {
  if (req.session.role !== "organization") {
    return res
      .status(403)
      .json({ message: "Only organizations can create opportunities." });
  }
  res.render("new-opportunity", {
    loggedIn: req.session.loggedIn,
    role: req.session.role,
  });
});

// edit a opportunity
router.get("/opportunities/:id", withAuth, async (req, res) => {
  try {
    const opportunityResponse = await Opportunity.findByPk(req.params.id);

    if (!opportunityResponse) {
      res
        .status(404)
        .json({ message: "Cannot locate opportunity with this id" });
      return;
    }
    // Serialize data before render to page.
    const opportunity = opportunityResponse.get({ plain: true });

    res.render("edit-opportunity", {
      opportunity,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
