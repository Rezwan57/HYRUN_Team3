import mysql from 'mysql2/promise'

let connection;

const host = "http://cs4team3.cs2410-web01pvm.aston.ac.uk"
const user = "cs4team3"
const password = "cs4team3"
const database = "cs4team3_db"

export const dbConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database
    });
  }
  return connection;
}
