// Initiate connection to PostgreSQL database
import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config(); 

/*const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: process.env.POSTGRESQL_PASSWORD,
    port: 5432,
});*/

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // This may be necessary for some hosted PostgreSQL services
    }
});

// Example test function to verify connection
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to the database successfully!');
        client.release();
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};


export default pool;