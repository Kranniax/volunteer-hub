import {
  randomUsers,
  createRandomVolunteers,
  createRandomOrganizations,
  createRandomVolunteerOpportunities,
  // volunteerSignups,
} from "./seedData.js";
import {
  User,
  Volunteer,
  Organization,
  Opportunity,
  // Signup,
} from "../../models/index.js";
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
    // await Signup.sync({ force: true });

    // Re-enable foreign key checks
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    const userModal = await User.bulkCreate(randomUsers);

    const userArr = userModal.map((user) => user.get({ plain: true }));
    const volunteerArr = userArr.filter((v) => v.role === "volunteer");
    const organizationArr = userArr.filter((o) => o.role === "organization");
    const adminArr = userArr.filter((a) => a.role === "admin");

    await Volunteer.bulkCreate(createRandomVolunteers(volunteerArr));

    await Organization.bulkCreate(createRandomOrganizations(organizationArr));
    await Opportunity.bulkCreate(createRandomVolunteerOpportunities(organizationArr));
    // await Signup.bulkCreate(volunteerSignups);
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.log("Error seeding database:" + error);
  }
}

seedModels();
