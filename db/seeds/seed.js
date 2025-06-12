import {
  randomUsers,
  createRandomVolunteers,
  createRandomOrganizations,
  createRandomVolunteerOpportunities,
  createRandomVolunteerSignUps,
} from "./seedData.js";
import {
  User,
  Volunteer,
  Organization,
  Opportunity,
  Signup,
} from "../../models/index.js";
import { sequelize } from "../../config/connections.js";

// Main function to seed all data into the database
async function seedDatabase() {
  try {
    // Disable foreign key checks to avoid constraint errors during table drops
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    // Drop and recreate tables for a clean slate
    await User.sync({ force: true });
    await Volunteer.sync({ force: true });
    await Organization.sync({ force: true });
    await Opportunity.sync({ force: true });
    await Signup.sync({ force: true }); // Uncomment if using Signup model

    // Re-enable foreign key checks after tables are recreated
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    // Seed users and get the created user records
    const userInstances = await User.bulkCreate(randomUsers);
    const users = userInstances.map((user) => user.get({ plain: true }));
    const volunteerUsers = users.filter((u) => u.role === "volunteer");
    const organizationUsers = users.filter((u) => u.role === "organization");

    // Seed volunteers using filtered volunteer users
    const volunteerInstances = await Volunteer.bulkCreate(
      createRandomVolunteers(volunteerUsers)
    );

    // Seed organizations using filtered organization users
    const organizationInstances = await Organization.bulkCreate(
      createRandomOrganizations(organizationUsers)
    );
    const organizations = organizationInstances.map((org) => org.get({ plain: true }));

    // Seed volunteer opportunities using created organizations
    const opportunityInstances = await Opportunity.bulkCreate(
      createRandomVolunteerOpportunities(organizations)
    );
    const opportunities = opportunityInstances.map((opp) => opp.get({ plain: true }));

    // Seed all volunteer opportunity signups
    await Signup.bulkCreate(
      createRandomVolunteerSignUps(
        opportunities,
        volunteerInstances.map((v) => v.get({ plain: true }))
      )
    );

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.log("Error seeding database: " + error);
  }
}

seedDatabase();
