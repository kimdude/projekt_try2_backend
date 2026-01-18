"use strict"

const model = require("../models/admin.model");
const Boom = require("@hapi/boom");

//Adding user
exports.addUser = async function(data) {
    try {
        return await model.add(data);
        
    } catch(error) {

        //Checking if error is due to duplicate username
        if(error.code === "23505") {
            throw Boom.conflict("Could not add user to database.");
        }

        //Unexpected errors
        throw Boom.badImplementation("A database error occurred while adding new user.");
    }
}

//Finding all users
exports.findUsers = async function() {
    try {
        return await model.findAll();

    } catch(error) {
        throw Boom.badImplementation("A database error occurred while fetching users.");
    }
}

//Finding specific user
exports.findUser = async function(id) {
    try {
        return await model.find(id);

    } catch(error) {
        
        //User not found
        if(error.cause === "User not found") {
            throw Boom.notFound("User not found.");
        }
       
        //Unexpected errors
        throw Boom.badImplementation("A database error occurred while fetching user.");
    }
}

//Updating user role
exports.updateUser = async function(id, data) {
    try {
        return await model.update(id, data);

    } catch(error) {

        //User not found
        if(error.cause === "User not found") {
            throw Boom.notFound("User not found.");
        }

        //Unexpected errors
        throw Boom.badImplementation("A database error occurred while updating user.");
    }
}

