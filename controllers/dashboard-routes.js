import { Router } from "express";
import {
  User,
  Volunteer,
  Opportunity,
  Signup,
  Organization,
} from "../models/index.js";
// import { json } from "sequelize";

const router = Router();

// Get loggedIn user profile
router.get("/", async (req, res) => {
  try {
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
            //   order: [["createdAt", "DESC"]],
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
    });
    if (!profileResponse) {
      res.status(404).json({ message: "Cannot locate this user" });
      return;
    }
    // res.status(200).json(profileResponse);
    const { volunteerProfile, ...extra } = profileResponse.get({ plain: true });
    res.render("dashboard", {
      volunteerProfile,
      opportunities: volunteerProfile.opportunities,
      loggedIn: req.session.loggedIn,
      extra,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
