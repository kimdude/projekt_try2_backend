"use strict"

const model = require("../models/category.model");
const Boom = require("@hapi/boom");

/* Category routes */
//Getting all categories
exports.getAllCategories = async() => {
    try {
        return await model.findAll();

    } catch(error) {
        throw Boom.badImplementation("An error occurred while fetching all categories.");
    }
}

//Adding category
exports.addCategory = async(data) => {
    try {
        return await model.add(data);

    } catch(error) {

        if(error.cause === "A conflict occurred while adding category") {
            throw Boom.conflict("A conflict occurred while adding category.");
        }
        
        throw Boom.badImplementation("An error occurred while adding category.");
    }
}

//Getting specific category
exports.getCategory = async(id) => {
    try {
        return await model.find(id);

    } catch(error) {
        
        //Invalid id
        if(error.cause === "Invalid category ID") {
            throw Boom.notFound("Invalid category ID.");
        }

        //Unexpected errors
        throw Boom.badImplementation("An error occurred while fetching category.");
    }
}

//Updating category
exports.updateCategory = async(id, data) => {
    try {
        return await model.update(id, data);

    } catch(error) {
        
        //Invalid id
        if(error.cause === "Invalid category ID") {
            throw Boom.notFound("Invalid category ID.");
        }

        //Unexpected errors
        throw Boom.badImplementation("An error occurred while updating category.");
    }
}

//Deleting category
exports.deleteCategory = async(id) => {
    try {
        console.log(id)
        return await model.delete(id);

    } catch(error) {
    
        //Invalid id
        if(error.cause === "Invalid category ID") {
            throw Boom.notFound("Invalid category ID.");
        }

        //Unexpected errors
        throw Boom.badImplementation("An error occurred while deleting category.");
    }
}