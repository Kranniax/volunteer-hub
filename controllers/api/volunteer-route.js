import { Router } from "express";
import { sequelize } from "../../config/connections.js";
import {
  Volunteer,
  Organization,
  VolunteerOpportunity,
} from "../../models/index.js";

const router = Router();

// Get volunteers
router.get("/", async (req, res) => {
  try {
    const dbVolunteerData = await Volunteer.findAll({
      include: [
        {
          model: Organization,
          as: "organizationProfile",
          include: {
            model: VolunteerOpportunity,
            as: "opportunities",
          },
        },
      ],
    });
    // Return query data from database.
    res.status(200).json(dbVolunteerData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single volunteer
router.get("/:id", async (req, res) => {
  try {
    // TODO: Add logic to get a single volunteer by id
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a volunteer
router.post("/", async (req, res) => {
  try {
    // TODO: Add logic to create a new volunteer
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a volunteer
router.put("/:id", async (req, res) => {
  try {
    // TODO: Add logic to update a volunteer by id
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a volunteer
router.delete("/:id", async (req, res) => {
  try {
    // TODO: Add logic to delete a volunteer by id
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
