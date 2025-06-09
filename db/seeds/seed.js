import { randomUsers, volunteers, organizations, volunteerOpportunities } from "./seedData.js";
import { User, Volunteer, Organization, Opportunity, Signup } from "../../models/index.js";
import { sequelize } from "../../config/connections.js";

// Seed data into database models.
async function seedModels() {
  try {
    // Disable foreign key checks temporarily
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    // Drop and recreate tables
    await User.sync({ force: true });
    await Volunteer.sync({ force: true });
    await Organization.sync({ force: true });
    await Opportunity.sync({ force: true });

    // Re-enable foreign key checks
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    await User.bulkCreate(randomUsers);
    await Volunteer.bulkCreate(volunteers);
    await Organization.bulkCreate(organizations);
    await Opportunity.bulkCreate(volunteerOpportunities);
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.log("Error seeding database:" + error);
  }
}

seedModels();
