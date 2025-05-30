import { Router } from "express";
import { Organization, User, Volunteer } from "../../models";

const router = Router();

// Get all users.
router.get("/", async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      include: [Volunteer, Organization],
    });
    res.status(200).json(dbUserData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get a single user.
router.get("/:id", (req, res) => {});

// Create a new user

// Update a user

// Delete a user
