"use strict"

const client = require("../database/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* User routes */
//Logging in user
exports.login = async function(data) {
    try {
        const { username, password } = data;

        //Validating user
        const result = await client.query(`SELECT * FROM users WHERE username=$1`, [username]);

        if(result.rows.length === 0) {
            throw new Error("Invalid username or password");
        }

        //Validating password with Bcrypt                                                          
        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        //Boom error
        if(!passwordMatch) {
            throw new Error("Invalid username or password");
        }

        //Creating token
        const payload = { id: user.user_id, username: username, permission: user.role }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        const response = {
            message: "User logged in",
            token: token
        }

        return response;

    } catch(error) {

        //Creating error
        const newError = new Error("DB_ERROR_DURING_LOGIN", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}

//Getting user info
exports.find = async function(id) {
    try {
        const result = await client.query(`SELECT role, fname, lname, username FROM users WHERE user_id=$1;`, [id]);

        if(result.rows.length === 0) {
            throw new Error("A conflict occurred");
        }

        return result.rows[0];

    } catch(error) {

        //Creating error
        const newError = new Error("DB_ERROR_FETCHING_USER_INFO", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}

//Updating user
exports.update = async function(id, data) {
    try {
        const { password, newPassword } = data;

        //Validating password
        const result = await client.query(`SELECT * FROM users WHERE user_id=$1;`,[id]);

        if(result.rows.length === 0){
            throw new Error("An error occurred fetching user");
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Could not update password");
        }

        //Updating password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await client.query(`UPDATE users SET password=$1 WHERE user_id=$2 RETURNING username;`, [hashedPassword, id]);

        if(updatedUser.rows.length === 0) {
            throw new Error("An error occurred updating password");
        }

        return updatedUser.rows[0];

    } catch(error) {

        //Creating error
        const newError = new Error("DB_ERROR_UPDATIING_USER", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}