"use strict"

const client = require("../database/db");
const bcrypt = require('bcrypt');

/* Admin routes */
//Adding user
exports.add = async function(data) {
    try {
        const { role, fname, lname, username, password } = data;

        //Hashing password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insertin into database
        const result = await client.query(`
            INSERT INTO users (role, fname, lname, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING username;`,
            [role, fname, lname, username, hashedPassword]
        );

        //Throwing error
        if(result.rows.length === 0) {
            throw new Error("User could not be added to database");
        }

        return result.rows[0];

    } catch(error) {

        //Creating error
        const newError = new Error("DB_ERROR_ADDING_USER", { cause: error.message });
        newError.code = error.code;
        
        throw newError;
    }

}

//Getting all users
exports.findAll = async function() {
    try {
        const result = await client.query(`SELECT user_id, role, fname, lname, username FROM users;`);

        //No users
        if(result.rows.length === 0) { 
            return null;
        }

        return result.rows;

    } catch(error) {
        throw new Error("DB_ERROR_FETCHING_USERS", { cause: error.message });
    }
}

//Find specific user
exports.find = async function(id) {
    try {
        const result = await client.query(`SELECT user_id, username, fname, lname, role FROM users WHERE user_id=$1;`, [id]);

        //Creating error
        if(result.rows.length === 0) {
            throw new Error("User not found");
        } 

        return result.rows[0];

    } catch(error) {

        //Creating error 
        const newError = new Error("DB_ERROR_FETCHING_USER", { cause: error.message });
        newError.code = error.code;

        throw newError;
       
    }
}

//Update user role
exports.update = async function(id, data) {
    try {

        const { role } = data;
        const result = await client.query(`UPDATE users SET role=$1 WHERE user_id=$2 RETURNING fname, lname, role;`, [role, id]);

        //Creating error
        if(result.rows.length === 0) {
            throw new Error("User not found");
        } 

        return result.rows[0];

    } catch(error) {

        //Creating error 
        const newError = new Error("DB_ERROR_FETCHING_USER", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}
