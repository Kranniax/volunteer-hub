import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { sequelize } from "./config/connections.js";
import controller from "./controllers/index.js";
import { create } from "express-handlebars";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";


import "dotenv/config";

const app = express();
const hbs = create({});
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Express middleware configuration
 */
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from 'public' directory


// Create the session store - note the different syntax
const SequelizeStore = connectSessionSequelize(session.Store);
// Setting up sessions on the backend server.
 const sess = {
   secret: process.env.SESSION_KEY,
   cookie: {},
   maxAge: 1800000, // session expires after 30mins.
   resave: false,
   saveUninitialized: true,
   // Store session data on database
   store: new SequelizeStore({
     db: sequelize,
   }),
 };
app.use(session(sess));

// Registration of the handlebars templating language.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Use the api routes
app.use(controller);
sequelize.query("SET FOREIGN_KEY_CHECKS = 0").then(() => {
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  });
});
