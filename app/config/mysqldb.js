
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  connectionLimit: 10,
  host     : 'localhost',
  user     : 'root',
  password : 'EDU23*EXM23',
  database : 'lab',
  timezone: 'utc' 

});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("My SQL Database Connected!");
});
module.exports = dbConn;



// var mysql = require('mysql');
// connection.getConnection(function (err, conn) {
//     if (err) throw err;

//     conn.release();

// });