const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL database.");

  // Create table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      address VARCHAR(255),
      latitude DOUBLE,
      longitude DOUBLE,
      distance DOUBLE
    );
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
      return;
    }
    console.log("Table 'schools' is ready.");

    // Seed data
    const seedData = `
      INSERT INTO schools (id, name, address, latitude, longitude, distance) VALUES
      (1, 'ABC School', '123 School Street', 12.9716, 77.5946, 0),
      (2, 'XYZ School', '456 School Avenue', 12.2958, 76.6394, 0),
      (3, 'PQR School', '789 School Lane', 13.0827, 80.2707, 0)
      ON DUPLICATE KEY UPDATE name = VALUES(name);
    `;

    connection.query(seedData, (err) => {
      if (err) {
        console.error("Error inserting seed data:", err.message);
        return;
      }
      console.log("Sample data inserted into 'schools' table.");
    });
  });
});

module.exports = connection;
