import { randomUsers, volunteers, organizations } from "./seedData.js";
import { User, Volunteer, Organization, Opportunity, Signup } from "../../models/index.js";

// Seed data into database models.
async function seedModels() {
  try {
    await User.bulkCreate(randomUsers);
    await Volunteer.bulkCreate(volunteers);
    await Organization.bulkCreate(organizations);
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.log("Error seeding database:" + error);
  }
}

seedModels();
