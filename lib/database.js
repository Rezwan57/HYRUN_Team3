import mysql from 'mysql2/promise'

let connection;
// const host = process.env.DATABASE_HOST
// const user = process.env.DATABASE_USER
// const password = process.env.DATABASE_PASSWORD
// const database = process.env.DATABASE_NAME

export default async function dbConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "cs2410-web01pvm.aston.ac.uk",
      user: "cs4team3",
      password: "tX6xgnwaotV56WP",
      database: "cs4team3_db",
      // host: process.env.DATABASE_HOST,
      // user: process.env.DATABASE_USER,
      // password: process.env.DATABASE_PASSWORD,
      // database: process.env.DATABASE_NAME,
      port: 3306,
      connectTimeout: 5000,
    });
  }
  return connection;
}