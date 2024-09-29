require("dotenv").config();

const express = require("express");
const cors = require("cors");
const consola = require("consola");
const { connectDB } = require("./config/database");
const { RolesRoute, PermissionsRoute, ResourcesRoute } = require("./routes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


//Database
(async () => {
  await connectDB();
})();

// Time log
const timeLog = (req, res, next) => {
  consola.info(`⏰ :: Time`, new Date(Date.now()).toLocaleString());
  next();
}

app.use(timeLog);


// Routes
RolesRoute(app);
PermissionsRoute(app);
ResourcesRoute(app);



exports.app = app;