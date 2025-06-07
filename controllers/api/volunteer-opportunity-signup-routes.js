import { Router } from "express";
import { Signup } from "../../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // Get all volunteer opportunity signups
    const signups = await Signup.findAll();
    res.status(200).json(signups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Get a single volunteer opportunity signup by id
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

router.post("/", async (req, res) => {
  try {
    // Create a new volunteer opportunity signup
    const newSignup = await Signup.create(req.body);
    res.status(201).json(newSignup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Delete a volunteer opportunity signup by id
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
