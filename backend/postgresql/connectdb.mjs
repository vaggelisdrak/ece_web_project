import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: process.env.POSTGRESQL_PASSWORD,
    port: 5432,
});

export default pool;