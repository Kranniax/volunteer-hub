import { seedUsers } from "./seedData.js";
import { User } from "../../models/index.js";

// Seed data into database models.
async function seedModels() {
  try {
    await User.bulkCreate(seedUsers);
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.log("Error seeding database:" + error);
  }
}

seedModels();
