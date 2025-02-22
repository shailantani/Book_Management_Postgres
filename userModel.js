const Pool = require("pg").Pool;
const dotenv = require("dotenv");

dotenv.config();
const user = process.env.user;
const host = process.env.host;
const database = process.env.database;
const table = process.env.table;
const password = process.env.password;
const port = process.env.port;

const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
  table: table,
});

module.exports = pool;
