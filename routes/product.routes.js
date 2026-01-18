"use strict"

const controller = require("../controllers/product.controller");
const Joi = require("joi");

//Product routes
module.exports = (server) => {
    server.route([

        //Getting all products
        {
            method: "GET",
            path: "/products",
            handler: async(request, h) => {
                return h.response({ message: "Welcome!" }).code(200);
            }
        },

        //Adding product
        {
            method: "POST",
            path: "/products",
            handler: async(request, h) => {
                return h.response({ message: "Welcome!" }).code(200);
            }
        },

        //Getting specific product
        {
            method: "GET",
            path: "/products/{id}",
            handler: async(request, h) => {
                return h.response({ message: "Welcome!" }).code(200);
            }
        },

        //Updating product
        {
            method: "PUT",
            path: "/products/{id}",
            handler: async(request, h) => {
                return h.response({ message: "Welcome!" }).code(200);
            }
        },

        //Deleting product
        {
            method: "DELETE",
            path: "/products/{id}",
            handler: async(request, h) => {
                return h.response({ message: "Welcome!" }).code(200);
            }
        },

        //Getting all shelves
        {
            method: "GET",
            path: "/shelves",
            handler: async(request, h) => {
                return h.response({ message: "Welcome!" }).code(200);
            }
        },

    ]);
}