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

  // Create table if it doesn't exist (without 'distance' column)
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      address VARCHAR(255),
      latitude DOUBLE,
      longitude DOUBLE
    );
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
      return;
    }
    console.log("Table 'schools' is ready.");

    // Reset the AUTO_INCREMENT counter (optional, if needed)
    const resetAutoIncrementQuery = `ALTER TABLE schools AUTO_INCREMENT = 1;`;

    connection.query(resetAutoIncrementQuery, (err) => {
      if (err) {
        console.error("Error resetting AUTO_INCREMENT:", err.message);
        return;
      }
      console.log("AUTO_INCREMENT reset to 1.");
    });
  });
});

module.exports = connection;
