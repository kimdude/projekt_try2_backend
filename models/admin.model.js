"use strict"

const client = require("../database/db");
const bcrypt = require('bcrypt');
const Boom = require("@hapi/boom");

/* Admin routes */
//Adding user
exports.add = async function(data) {
        const { role, fname, lname, username, password } = data;

        //Hashing password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insertin into database
        const result = await client.query(`
            INSERT INTO users (role, fname, lname, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING username;`,
            [role, fname, lname, username, hashedPassword]
        );

        //Boom error
        if(result.rows.length === 0) throw Boom.conflict("A conflict occurred while adding new user.");

        console.log(result.rows[0])
        return result.rows[0];

}

//Getting all users
exports.findAll = async function() {
    
}

//Find specific


//Update user role
