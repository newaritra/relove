const mysql = require("mysql2");

const Pool = mysql.createPool({
  host: "sql6.freemysqlhosting.net",
  database: "sql6517842",
  user:"sql6517842",
  password: "Z325awxjaf",
});

module.exports = Pool;
