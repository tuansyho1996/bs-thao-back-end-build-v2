// get the client
import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hoidanit_nodejs'
});

// simple query
// connection.query(
//     'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//     function (err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     }
// );
export default connection;