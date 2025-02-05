require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ Connected to MySQL (phpMyAdmin - Group Database)...");
  }
});

app.get("/", (req, res) => {
  res.send("🚀 API is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
