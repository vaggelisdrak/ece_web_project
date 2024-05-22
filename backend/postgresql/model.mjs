// This file contains the model functions for the DamageTicket and User tables.
import bcrypt from 'bcrypt'
import pool from './connectdb.mjs';


// Exported Functions for the DamageTicket Table
export let getAllDamageTickets = async () => {
    //const query = 'SELECT * FROM "DamageTicket"';
   const query = `
        SELECT dt.*, u.username AS user_username
        FROM "DamageTicket" dt
        INNER JOIN "User" u ON "user_ID" = u.id`;
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query);
        console.log(result.rows);
        return result.rows;
    } catch (err) {
        console.error('Error fetching damage tickets:', err);
        throw err;
    } finally {
        await client.release();
    }
};

export let getDamageTicket = async (damageTicketId) => {
    const query = 'SELECT * FROM "DamageTicket" WHERE id = $1 LIMIT 1';
    const values = [damageTicketId];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching damage ticket:', err);
        throw err;
    } finally {
        await client.release();
    }
};

export let getAllUserDamageTickets = async (userId) => {
    const query = 'SELECT * FROM "DamageTicket" WHERE "user_ID" = $1';
    const values = [userId];
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows;
    } catch (err) {
        console.error('Error fetching user posts:', err);
        throw err;
    } finally {
        await client.release();
    }
};

export let getUserDamageTicket = async (userId, damageTicketId) => {
    const query = 'SELECT * FROM "DamageTicket" WHERE "user_ID" = $1 AND "damageTicket_ID" = $2 LIMIT 1';
    const values = [userId, damageTicketId];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching user post:', err);
        throw err;
    } finally {
        await client.release();
    }
};

export let addDamageTicket = async (newDamageTicket, userId) => {
    const query = `
        INSERT INTO "DamageTicket" 
        ("status", "image", "location", "category", "description", "user_ID", "report_date")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const values = [
        newDamageTicket.status,
        newDamageTicket.image,
        newDamageTicket.location,
        newDamageTicket.category,
        newDamageTicket.description,
        newDamageTicket.user_ID || userId,
        newDamageTicket.report_date
    ];

    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        console.log(result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error adding damage ticket:', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
};
export let updateDamageTicket = async (damageTicketId, updatedFields) => {
    // Construct the SET part of the SQL query dynamically based on the fields provided in updatedFields'
    const setClause = Object.keys(updatedFields)
        .map((key, index) => `"${key}" = $${index + 2}`)
        .join(', ');

    const query = `
        UPDATE "DamageTicket"
        SET ${setClause}
        WHERE "id" = $1
        RETURNING *;
    `;

    const values = [damageTicketId, ...Object.values(updatedFields)];
    //console.log(values);

    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating damage ticket:', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
};

export let deleteDamageTicket = async (damageTicketId) => {
    const query = `
        DELETE FROM "DamageTicket"
        WHERE "id" = $1
        RETURNING *;
    `;

    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, [damageTicketId]);
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting damage ticket:', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
};

// Exported Functions for the User Table

// Function to get a user by email
export let getUserByEmail = async (email) => {
    const query = 'SELECT * FROM "User" WHERE email = $1 LIMIT 1';
    const values = [email];

    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error getting user by email:', err);
        throw err;
    } finally {
        if (client) client.release();
    }
}

// Function to get a user by username
export let getUserByUsername = async (username) => {
    const query = 'SELECT * FROM "User" WHERE username = $1 LIMIT 1';
    const values = [username];

    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error getting user by username:', err);
        throw err;
    } finally {
        if (client) client.release();
    }
}

// Function to create a new user with a password
export let registerUser = async (username, email, password) => {
    // Check if a user with this email or username already exists
    const existingEmail = await getUserByEmail(email);
    const existingUsername = await getUserByUsername(username);

    if (existingEmail) {
        return { message: "This email already exists" };
    } else if (existingUsername) {
        return { message: "This username already exists" };
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO "User" (username, password, email) VALUES ($1, $2, $3) RETURNING id';
        const values = [username, hashedPassword, email];

        let client;
        try {
            client = await pool.connect();
            const result = await client.query(query, values);
            return result.rows[0].id;
        } catch (err) {
            console.error('Error registering user with password:', err);
            throw err;
        } finally {
            if (client) client.release();
        }
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

// Exported Functions for the Admin Table

export let getAllAdmins = async () => {
    const query = 'SELECT * FROM "Admin"';
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query);
        return result.rows;
    } catch (err) {
        console.error('Error fetching admins:', err);
        throw err;
    } finally {
        if (client) client.release();
    }
};

// Get All Technicians 
export let getAllTechnicians = async () => {
    const query = 'SELECT * FROM "Technician"';
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query);
        console.log(result.rows);
        return result.rows;
    } catch (err) {
        console.error('Error fetching Technicians', err);
        throw err;
    } finally {
        await client.release();
    }
};

// Add a new Technician
export let addTechnician = async (technician) => {
    console.log('Function called');
    const query = 'INSERT INTO "Technician" (id, full_name, email, phone_number, specialty) VALUES ($1, $2, $3, $4, $5)';
    let client;
    try {
        client = await pool.connect();
        await client.query(query, [technician.id, technician.name, technician.email, technician.contact, technician.specialty]);
        console.log('Technician added successfully');
    } catch (err) {
        console.error('Error adding Technician', err);
        throw err;
    } finally {
        await client.release();
    }
};