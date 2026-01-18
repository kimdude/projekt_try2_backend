"use strict"

const model = require("../models/product.model");
const Boom = require("@hapi/boom");

/* Product routes */
//Getting all products
exports.getAllProducts = async() => {
    try {
        return await model.findAll();

    } catch(error) {
        
        //Boom error
        throw Boom.badImplementation("An error occurred while fetching all products.");
    }
}

//Adding products
exports.addProduct = async(userId, data) => {
    try {
        return await model.add(userId, data);

    } catch(error) {

        //Duplicate products
        if(error.code === "23505") {
            throw Boom.conflict("Product already exists.");
        }

        if(error.cause === "A conflict occurred while adding product") {
            throw Boom.conflict("A conflict occurred while adding product.");
        }
        
        //Boom error
        throw Boom.badImplementation("An error occurred while adding product."); 
    }
}

//Getting specific products
exports.getProduct = async(id) => {
    try {
        return await model.find(id);

    } catch(error) {

        //Invalid id
        if(error.cause === "Invalid product ID") {
            throw Boom.notFound("Invalid product ID.");
        }

        //Unexpected error
        throw Boom.badImplementation("An error occurred while fetching product."); 
        
    } 
}

//Editing products
exports.editProduct = async(userId, productId, data) => {
    try {
        return await model.edit(userId, productId, data);

    } catch(error) {

        //Invalid id
        if(error.cause === "Invalid product ID") {
            throw Boom.notFound("Invalid product ID.");
        }

        //Unexpected error
        throw Boom.badImplementation("An error occurred while editing product."); 
        
    } 
}

//Updating product stock
exports.updateProduct = async(productId, data) => {
    try {
        return await model.update(productId, data);

    } catch(error) {

        //Invalid id
        if(error.cause === "Invalid product ID") {
            throw Boom.notFound("Invalid product ID.");
        }

        //Unexpected error
        throw Boom.badImplementation("An error occurred while updating stock."); 
    } 
}

//Deleting products
exports.deleteProduct = async(id) => {
    try {
        return await model.delete(id);

    } catch(error) {

        //Invalid id
        if(error.cause === "Invalid product ID") {
            throw Boom.notFound("Invalid product ID.");
        }

        //Unexpected error
        throw Boom.badImplementation("An error occurred while deleting product.");   
    }
}

//Getting shelves
exports.getShelves = async() => {
    try {
        return await model.findShelves();

    } catch(error) {
        
        //Boom error
        throw Boom.badImplementation("An error occurred while fetching shelves.");
    }
}