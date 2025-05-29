// Import necessary classes from sequelize
import { DataTypes, Model } from "sequelize";

// Define the Organization model by extending Sequelize's Model class
class Organization extends Model {}

// Initialize the Organization model with its schema and options
Organization.init(
  {
    // Primary key: unique ID for each organization, auto-incremented
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
    // Organization name (required)
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Detailed description of the organization (required)
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Mission statement of the organization
    mission: {
      type: DataTypes.TEXT,
    },
    // Organization phone number
    phone: {
      type: DataTypes.STRING,
    },
    // Organization website URL
    website: {
      type: DataTypes.STRING,
    },
    // Address of the organization
    address: {
      type: DataTypes.TEXT,
    },
    // Latitude coordinate for the organization's location
    latitude: {
      type: DataTypes.DECIMAL,
    },
    // Longitude coordinate for the organization's location
    longitude: {
      type: DataTypes.DECIMAL,
    },
    // Name of the main contact person
    contactPerson: {
      type: DataTypes.STRING,
    },
    // URL or path to the organization's logo image
    logoImage: {
      type: DataTypes.STRING,
    },
    // Whether the organization is verified
    isVerified: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize, 
    timestamps: true, // Track when organizations are created or updated
    freezeTableName: true, // Do not pluralize the name of the database table
    underscored: true, // Use underscores instead of camel-casing for column names
    modelName: "organization", // Set the model name
  }
);

// Export the Organization model for use in other files
export { Organization };
