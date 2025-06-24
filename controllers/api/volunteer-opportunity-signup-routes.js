import { Router } from "express";
import { Signup } from "../../models/index.js";

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
router.post("/", async (req, res) => {
  try {
    const newSignup = await Signup.create(req.body);
    res.status(201).json(newSignup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete a volunteer opportunity signup by id
router.delete("/:id", async (req, res) => {
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
