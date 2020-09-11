var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'database-1.cg9cbkr2hza5.us-east-1.rds.amazonaws.com', // Replace with your host name
  user: 'nedazal',      // Replace with your database username
  password: 'weborpjektas',      // Replace with your database password
  database: 'web' // // Replace with your database Name
});
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;
