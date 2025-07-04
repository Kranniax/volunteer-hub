import { Router } from "express";
import { Signup } from "../../models/index.js";
import { withAuth } from "../../utils/auth.js";

const router = Router();
// Get all volunteer opportunity signups
router.get("/", async (req, res) => {
  try {
    const signups = await Signup.findAll();
    res.status(200).json(signups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all volunteers who signed up for a specific opportunity.
router.get("/opportunity/:id", async (req, res) => {
  try {
    const signupResponse = await Signup.findAll({
      where: {
        opportunity_id: req.params.id,
      },
    });

    if (signupResponse.length === 0) {
      res.status(404).json({ message: "Cannot locate signups with this id!" });
      return;
    }

    res.status(200).json(signupResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single volunteer opportunity signup by id
router.get("/:id", async (req, res) => {
  try {
    const singleSignup = await Signup.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!singleSignup) {
      res.status(404).json({ message: "Cannot locate signup with this id." });
      return;
    }
    res.status(200).json(singleSignup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Create a new volunteer opportunity signup
router.post("/", withAuth, async (req, res) => {
  try {
    const newSignup = await Signup.create(req.body);
    res.status(201).json(newSignup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete a volunteer opportunity signup by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedSignup = await Signup.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedSignup) {
      res.status(404).json({ message: "Cannot locate signup with this id" });
      return;
    }
    res.status(200).json({ message: "The signup has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete opportunity" });
  }
});

export default router;
