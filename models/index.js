// Import all models
import { User } from "./User.js";
import { Volunteer } from "./Volunteer.js";
import { Organization } from "./Organization.js";
import { VolunteerOpportunity } from "./VolunteerOpportunity.js";
import { VolunteerOpportunitySignups } from "./VolunteerOpportunitySignups.js";

// Set up model associations

// User has one Volunteer profile (1:1)
User.hasOne(Volunteer, {
  foreignKey: "user_id",
  as: "volunteerProfile",
});
// Volunteer belongs to User (1:1)
Volunteer.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// User has one Organization profile (1:1)
User.hasOne(Organization, {
  foreignKey: "user_id",
  as: "organizationProfile",
});
// Organization belongs to User (1:1)
Organization.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Organization has many VolunteerOpportunities (1:M)
Organization.hasMany(VolunteerOpportunity, {
  foreignKey: "organization_id",
  as: "opportunities",
});
// VolunteerOpportunity belongs to Organization (M:1)
VolunteerOpportunity.belongsTo(Organization, {
  foreignKey: "organization_id",
  as: "organization",
});

// Volunteer <-> VolunteerOpportunity many-to-many relationship through VolunteerOpportunitySignups
Volunteer.belongsToMany(VolunteerOpportunity, {
  through: VolunteerOpportunitySignups, // Join table
  foreignKey: "volunteer_id",
  otherKey: "volunteer_opportunity_id",
});

VolunteerOpportunity.belongsToMany(Volunteer, {
  through: VolunteerOpportunitySignups, // Join table
  foreignKey: "volunteer_opportunity_id",
  otherKey: "volunteer_id",
});

// Export all models for use elsewhere in the app
export {
  User,
  Volunteer,
  Organization,
  VolunteerOpportunity,
  VolunteerOpportunitySignups,
};
