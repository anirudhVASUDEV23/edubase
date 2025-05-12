const express = require("express");
const bodyParser = require("body-parser");
const schoolRoutes = require("./schoolRoutes"); // Import routes

const app = express();
app.use(bodyParser.json()); // For parsing JSON requests

// Use the routes defined in schoolRoutes.js
app.use("/", schoolRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
