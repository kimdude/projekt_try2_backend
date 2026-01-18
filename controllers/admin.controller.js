"use strict"

const model = require("../models/admin.model");
const Boom = require("@hapi/boom");

//Adding user
exports.addUser = async function(data) {
    try {
        return await model.add(data);
        
    } catch(error) {

        //Checking if error has already been defined
        if(error.isBoom) { 
            throw error;
        }

        throw Boom.boomify(error);
    }
}

