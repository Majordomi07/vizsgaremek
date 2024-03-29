const mysql = require("mysql");
require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Adatbázis kapcsolat hiba:", err.stack);
    return;
  }
  console.log("Adatbázis kapcsolat sikeres.");
});

module.exports = connection;
