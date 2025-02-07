import mysql from 'mysql2/promise'

const db = mysql.createPool({
  host: "127.0.0.1", 
  user: "root",
  password: "", 
  database: "cs4team3_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;






//for real server - which is not working!!!
// let connection;

// export const db = async () => {
//   if (!connection) {
//     connection = await mysql.createConnection({
//       // host: "cs2410-web01pvm.aston.ac.uk",
//       // user: "cs4team3",
//       // password: "tX6xgnwaotV56WP",
//       // database: "cs4team3_db",
//       // port: 3306,
//       host: "localhost",
//       user: "root",
//       password: "",
//       database: "cs4team3_db",
//     });
//   }
//   return connection;
// }
