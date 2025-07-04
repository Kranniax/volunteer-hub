import { Router } from "express";
import { sequelize } from "../../config/connections.js";
import {
  Volunteer,
  Organization,
  Opportunity,
  Signup,
} from "../../models/index.js";
import { withAuth } from "../../utils/auth.js";

const router = Router();

// Get volunteers
router.get("/", async (req, res) => {
  try {
    const dbVolunteerData = await Volunteer.findAll({});
    // Return query data from database.
    res.status(200).json(dbVolunteerData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single volunteer
router.get("/:id", async (req, res) => {
  try {
    const dbSingleVolunteerData = await Volunteer.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Opportunity,
          through: Signup, // hides join table fields if you want
          include: [
            {
              model: Organization,
              as: "organization", // use the alias from your association
            },
          ],
        },
      ],
    });
    if (!dbSingleVolunteerData) {
      res.status(404).json({ message: "Cannot locate volunteer with this id" });
      return;
    }
    res.status(200).json(dbSingleVolunteerData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a volunteer
router.post("/", withAuth, async (req, res) => {
  req.body.user_id = req.session.user_id;

  try {
    const newVolunteerData = await Volunteer.create(req.body);

    req.session.save(() => {
      req.session.volunteer_id = newVolunteerData.id;
      res.status(201).json(newVolunteerData);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a volunteer
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateVolunteerData = await Volunteer.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateVolunteerData) {
      res.status(404).json({ message: "Cannot locate user with this id." });
      return;
    }

    const updatedVolunteer = await Volunteer.findByPk(req.params.id);
    res.status(200).json(updatedVolunteer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a volunteer
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedVolunteerData = await Volunteer.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedVolunteerData) {
      res
        .status(404)
        .json({ message: "Cannot locate volunteer with this id." });
      return;
    }
    res.status(200).json({ message: "Volunteer deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
