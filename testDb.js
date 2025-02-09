import mysql from "mysql2/promise";

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: "cs2410-web01pvm.aston.ac.uk",
      user: "cs4team3",
      password: "tX6xgnwaotV56WP",
      database: "cs4team3_db",
    });

    console.log("✅ Database Connected Successfully!");
    await connection.end();
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
  }
}

testConnection();