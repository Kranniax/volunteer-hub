// Import necessary classes from sequelize
import { DataTypes, Model } from "sequelize";

// Define the Event model by extending Sequelize's Model class
class Event extends Model {}

// Initialize the Event model with its schema and options
Event.init(
  {
    // Primary key: unique ID for each event, auto-incremented
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // Title of the event (required)
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Date of the event (required)
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Location of the event (required)
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Description of the event (optional)
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    // Pass the sequelize instance and set model/table options
    sequelize,
    timestamps: true, // Automatically add createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing table name
    underscored: true, // Use snake_case for automatically added fields
    modelName: "event", // Set the model name
  }
);

// Export the Event model for use in other files
export { Event };
