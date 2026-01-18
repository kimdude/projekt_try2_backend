"use strict"

const client = require("../database/db");
const Boom = require("@hapi/boom");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* User routes */
//Logging in user
exports.login = async function(data) {
    const { username, password } = data;

    //Validating user
    const result = await client.query(`SELECT * FROM users WHERE username=$1`, [username]);

    //Boom error
    if(result.rows.length === 0) throw Boom.unauthorized("Invalid username or password");

    //Validating password with Bcrypt                                                           /FÖR TESTNING, KOMMENTERA BORT RAD 19-24
    const user = result.rows[0];
     const passwordMatch = await bcrypt.compare(password, user.password);

    //Boom error
    if(!passwordMatch) throw Boom.unauthorized("Invalid username or password");  

    //Creating token
    const payload = { id: user.user_id, username: username, permission: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
    const response = {
        message: "User logged in",
        token: token
    }

    return response;
}

//Getting user info
exports.find = async function(info) {

}

//Updating user
exports.update = async function(id, data) {

}