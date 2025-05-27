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
    // Email address (required, must be unique and valid format)
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // No duplicate emails allowed
      validate: {
        isEmail: true, // Checks for valid email format
      },
    },
    // Password (required, minimum length 4)
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4], // Password must be at least 4 characters
      },
    },
  },
  {
    sequelize, // Pass the sequelize instance
    // Don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // Don't pluralize the name of the database table
    freezeTableName: true,
    // Use underscores instead of camel-casing for column names
    underscored: true,
    // Set the model name
    modelName: "volunteer",
  }
);

// Export the Volunteer model for use in other files
export { Volunteer };
