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

  // 💥 Drop table first to fix any broken AUTO_INCREMENT
  const dropTableQuery = `DROP TABLE IF EXISTS schools`;

  connection.query(dropTableQuery, (err) => {
    if (err) {
      console.error("Error dropping table:", err.message);
      return;
    }
    console.log("Old 'schools' table dropped.");

    // ✅ Now create fresh table with proper AUTO_INCREMENT
    const createTableQuery = `
      CREATE TABLE schools (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude DOUBLE NOT NULL,
        longitude DOUBLE NOT NULL
      );
    `;

    connection.query(createTableQuery, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
        return;
      }
      console.log("Fresh 'schools' table created.");
    });
  });
});

module.exports = connection;
