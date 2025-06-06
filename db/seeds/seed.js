import { randomUsers, volunteers } from "./seedData.js";
import { User, Volunteer } from "../../models/index.js";

// Seed data into database models.
async function seedModels() {
  try {
    await User.bulkCreate(randomUsers);
    await Volunteer.bulkCreate(volunteers);
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.log("Error seeding database:" + error);
  }
}

seedModels();
