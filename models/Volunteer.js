// Import necessary classes from sequelize
import { DataTypes, Model } from "sequelize";
// Import the sequelize instance from your config file
import { sequelize } from "../config/connections.js";

// Define the Volunteer model by extending Sequelize's Model class
class Volunteer extends Model {}

// Initialize the Volunteer model with its schema and options
Volunteer.init(
  {
    // Primary key: unique ID for each volunteer, auto-incremented
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // Foreign key: references the user table
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // First name of the volunteer (required)
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Last name of the volunteer (required)
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Phone number of the volunteer (consider using STRING for flexibility)
    phone: {
      type: DataTypes.STRING,
    },
    // Date of birth of the volunteer
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Address of the volunteer
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Emergency contact information (stored as JSON: {name, phone, relationship})
    emergencyContact: {
      type: DataTypes.JSON,
    },
    // Short biography of the volunteer
    bio: {
      type: DataTypes.TEXT,
    },
    // URL or path to the volunteer's profile image
    profileImage: {
      type: DataTypes.STRING,
    },
    // Total hours volunteered
    totalHours: {
      type: DataTypes.INTEGER,
    },
    // Whether the volunteer is currently active
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    // Track when volunteers are created or updated
    timestamps: true,
    // Do not pluralize the name of the database table
    freezeTableName: true,
    // Use underscores instead of camel-casing for column names
    underscored: true,
    // Set the model name
    modelName: "volunteer",
  }
);

// Export the Volunteer model for use in other files
export { Volunteer };
