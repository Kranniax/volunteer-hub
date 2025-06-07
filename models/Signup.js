// Import necessary classes from sequelize
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connections.js";

// Define the VolunteerOpportunitySignups model for the join table
class Signup extends Model {}

// Initialize the VolunteerOpportunitySignups model with its schema and options
Signup.init(
  {
    // Primary key: unique ID for each signup, auto-incremented
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // Foreign key: references the volunteer_opportunity table
    opportunity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "opportunity",
        key: "id",
      },
    },
    // Foreign key: references the volunteer table
    volunteer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "volunteer",
        key: "id",
      },
    },
  },
  {
    sequelize, // Pass the sequelize instance
    timestamps: true, // Track when signups are created or updated
    freezeTableName: true, // Do not pluralize the name of the database table
    underscored: true, // Use underscores instead of camel-casing for column names
    modelName: "signups", // Set the model name
  }
);

// Export the VolunteerOpportunitySignups model for use in other files
export { Signup };
