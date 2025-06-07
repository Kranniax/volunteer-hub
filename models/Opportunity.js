import { DataTypes, Model } from "sequelize";
// import { Organization } from "./Organization";
import { sequelize } from "../config/connections.js";

/*
VolunteerOpportunity is focused on long-term or ongoing roles, such as tutoring, 
mentorship, or administrative assistance. These opportunities might not have a 
fixed date and time—they could be recurring or flexible engagements.
*/
class Opportunity extends Model {}

// Initialize the VolunteerOpportunity model with its schema
Opportunity.init(
  {
    // Primary key: unique ID for each opportunity
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "organization",
        key: "id",
      },
    },
    // Title of the volunteer opportunity
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Detailed description of the opportunity
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Requirements for volunteers
    requirements: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Date of the opportunity (stored as string)
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // The start time of the volunteer opportunity
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    // The end time of the volunteer opportunity
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    // The current available open spots.
    spotsAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // The number of spots being full.
    spotsFilledCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Status of the opportunity (e.g., open, closed)
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Additional model options can be specified here
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "opportunity",
  }
);

export { Opportunity };
