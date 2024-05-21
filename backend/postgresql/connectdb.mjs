// Initiate connection to PostgreSQL database
import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config(); 

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: process.env.POSTGRESQL_PASSWORD,
    port: 5432,
});

export default pool;