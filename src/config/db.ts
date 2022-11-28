import Pool from "pg-pool";
import config from "./";

const { database, user, password, port } = config.postgres;

// you can pass properties to the pool
// these properties are passed unchanged to both the node-postgres Client constructor
// and the node-pool (https://github.com/coopernurse/node-pool) constructor
// allowing you to fully configure the behavior of both
const pool = new Pool({
  database,
  user,
  password,
  port,
  ssl: false,
  max: 20, // set pool max size to 20
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
  maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
});

export default pool;
