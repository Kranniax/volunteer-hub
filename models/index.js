// Import all models
import { User } from "./User.js";
import { Volunteer } from "./Volunteer.js";
import { Organization } from "./Organization.js";
import { Opportunity } from "./Opportunity.js";
import { Signup } from "./Signup.js";

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
Organization.hasMany(Opportunity, {
  foreignKey: "organization_id",
  as: "opportunities",
});
// VolunteerOpportunity belongs to Organization (M:1)
Opportunity.belongsTo(Organization, {
  foreignKey: "organization_id",
  as: "organization",
});

// Volunteer <-> VolunteerOpportunity many-to-many relationship through VolunteerOpportunitySignups
Volunteer.belongsToMany(Opportunity, {
  through: Signup, // Join table
  foreignKey: "volunteer_id",
  otherKey: "opportunity_id",
});

Opportunity.belongsToMany(Volunteer, {
  through: Signup, // Join table
  foreignKey: "opportunity_id",
  otherKey: "volunteer_id",
});

// Export all models for use elsewhere in the app
export {
  User,
  Volunteer,
  Organization,
  Opportunity,
  Signup,
};
