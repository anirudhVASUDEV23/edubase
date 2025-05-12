const express = require("express");
const router = express.Router();
const db = require("./db"); // Import the database connection

// Haversine formula for calculating distance between two latitudes and longitudes
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

// Add School API
router.post("/addSchool", (req, res) => {
  console.log("in addSchool");
  const { name, address, latitude, longitude } = req.body;

  // Validate the input
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Insert data into the schools table
  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(query, [name, address, latitude, longitude], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "School added successfully" });
  });
});

// List Schools API with sorting by proximity to user's coordinates
router.get("/listSchools/:userLat/:userLon", (req, res) => {
  const { userLat, userLon } = req.params; // Get user latitude and longitude from URL parameters

  // Ensure lat and lon are provided
  if (!userLat || !userLon) {
    return res
      .status(400)
      .json({ error: "User latitude and longitude are required" });
  }

  // Convert user latitude and longitude to float
  const userLatFloat = parseFloat(userLat);
  const userLonFloat = parseFloat(userLon);

  // Fetch all schools from the database
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Calculate distances and keep them separate from school objects
    const schoolsWithDistances = results.map((school) => ({
      ...school, // retain the original school object data
      distance: haversine(
        userLatFloat,
        userLonFloat,
        school.latitude,
        school.longitude
      ), // Calculate distance
    }));

    // Sort the schools by the calculated distance without modifying the original objects
    schoolsWithDistances.sort((a, b) => a.distance - b.distance);

    // Return the sorted list of schools
    res.json(schoolsWithDistances);
  });
});

module.exports = router;
