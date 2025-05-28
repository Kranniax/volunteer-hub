import { DataTypes, Model } from "sequelize";

class Organization extends Model {}

Organization.init(
  {
    // Primary key: unique ID for each organization, auto-incremented.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // Organization name required.
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    contactPhone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    // Don't pluralize the name of the database table
    freezeTableName: true,
    // Use underscores instead of camel-casing for column names
    underscored: true,
    modelName: "organization",
  }
);

export { Organization };
