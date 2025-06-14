import { DataTypes, Model } from "sequelize";
// Import the sequelize instance from your config file
import { sequelize } from "../config/connections.js";
import bcrypt from "bcrypt";

// Define the Volunteer model by extending Sequelize's Model class
class User extends Model {}

// Initialize the User model with its schema and options
User.init(
  {
    // Primary key: unique ID for each user, auto-incremented
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    role: {
      type: DataTypes.ENUM("volunteer", "organization", "admin"),
      allowNull: false,
    },
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
       beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize, // Pass the sequelize instance
    // Don't automatically create createdAt/updatedAt timestamp fields
    timestamps: true,
    // Don't pluralize the name of the database table
    freezeTableName: true,
    // Use underscores instead of camel-casing for column names
    underscored: true,
    // Set the model name
    modelName: "user",
  }
);

// Export the Volunteer model for use in other files
export { User };
