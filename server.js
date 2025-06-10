import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { sequelize } from "./config/connections.js";
import controller from "./controllers/index.js";

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Express middleware configuration
 */
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from 'public' directory

// Use the api routes
app.use(controller);
sequelize.query("SET FOREIGN_KEY_CHECKS = 0").then(() => {
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  });
});
