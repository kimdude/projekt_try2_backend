"use strict"

const model = require("../models/user.model");
const Boom = require("@hapi/boom")

//Logging in 
exports.loginUser = async function(data) {
    try {
        return await model.login(data);

    } catch(error) {

        //Invalid login
        if(error.cause === "Invalid username or password") {    
            throw Boom.unauthorized("Invalid username or password");
        }

        //Unexpected errors
        throw Boom.badImplementation("A database error occurred while logging in.");
    }
}

//Getting user info
exports.findInfo = async function(id) {
    try {
        return await model.find(id);

    } catch(error) {

        //Unexpected errors, id from credentials should exist and therefore not be the cause
        throw Boom.badImplementation("A database error occurred while fetching user info.");
    }
}

//Updating password
exports.updateUser = async function(id, data) {
    try {
        return await model.update(id, data);

    } catch(error) {

        //Invalid password
        if(error.cause === "Could not update password") {
            throw Boom.unauthorized("An error occurred updating user.");
        }

        //Unexpected errors, id from credentials should exist and therefore not be the cause
        throw Boom.badImplementation("A database error occurred while updating user.");
    }
}