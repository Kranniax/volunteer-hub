import { Router } from "express";
import { Organization, User, Volunteer } from "../../models/index.js";

const router = Router();

// Get all users.
router.get("/", async (req, res) => {
  try {
    const dbUserData = await User.findAll();
    res.status(200).json(dbUserData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get a single user.
router.get("/:id", async (req, res) => {
  try {
    const dbSingleUserData = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!dbSingleUserData) {
      res.status(404).json({ message: "Cannot locate user with this id." });
      return;
    }
    res.status(200).json(dbSingleUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Create a new user.
router.post("/", async (req, res) => {
  try {
    const newUserData = await User.create({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    res.status(200).json(newUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
// Update a user
router.put("/:id", async (req, res) => {
  try {
    // The update request return an array with the number of affected rows.
    const [updatedUserData] = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedUserData) {
      res.status(404).json({ message: "Cannot locate user with this id." });
      return;
    }

    const updatedUser = await User.findByPk(req.params.id);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUserData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedUserData) {
      res.status(404).json({ message: "Cannot locate user with this id." });
      return;
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

export default router;
