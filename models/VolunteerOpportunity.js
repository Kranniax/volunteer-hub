import { DataTypes, Model } from "sequelize";

class VolunteerOpportunity extends Model {}

// Initialize the VolunteerOpportunity model with its schema
VolunteerOpportunity.init(
  {
    // Primary key: unique ID for each opportunity
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    modelName: "volunteer_opportunity",
  }
);

export { VolunteerOpportunity };
