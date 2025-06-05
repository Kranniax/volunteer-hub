import { User } from "./User.js";
import { Volunteer } from "./Volunteer.js";
import { Organization } from "./Organization.js";
import { VolunteerOpportunity } from "./VolunteerOpportunity.js";

// The modal associations
User.hasOne(Volunteer, {
  foreignKey: "user_id",
  as: "volunteerProfile",
});
Volunteer.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasOne(Organization, {
  foreignKey: "user_id",
  as: "organizationProfile",
});
Organization.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Organization.hasMany(VolunteerOpportunity, {
  foreignKey: "organization_id",
  as: "opportunities",
});
VolunteerOpportunity.belongsTo(Organization, {
  foreignKey: "organization_id",
  as: "organization",
});

// Many to many relationship.
Volunteer.belongsToMany(Organization, {
  through: VolunteerOpportunity,
  foreignKey: "volunteer_id",
  otherKey: "organization_id",
  as: "recentOrganizations",
});
Organization.belongsToMany(Volunteer, {
  through: VolunteerOpportunity,
  foreignKey: "organization_id",
  otherKey: "volunteer_id",
  as: "volunteers",
});


export { User, Volunteer, Organization, VolunteerOpportunity };
