require('dotenv').config();
const mysql = require('mysql2');

const { HOST, PORT, DB_USER, DB_PASSWORD, DATABASE } = process.env;

module.exports = mysql.createPool({
  connectionLimit : 10,
  host            : HOST,
  port            : PORT,
  user            : DB_USER,
  password        : DB_PASSWORD,
  database        : DATABASE
});