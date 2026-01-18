"use strict"

const model = require("../models/user.model");
const Boom = require("@hapi/boom")

//Logging in 
exports.loginUser = async function(data) {
    return await model.login(data);
}

//Getting user info
exports.findInfo = async function() {

}

//Updating password
exports.updatePassword = async function() {
    
}