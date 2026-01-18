"use strict"

const controller = require("../controllers/category.controller");
const Joi = require("joi");

//Product routes
module.exports = (server) => {
    server.route([

        //Getting all categories
        {
            method: "GET",
            path: "/categories",
            handler: async(request, h) => {
                const result = await controller.getAllCategories();
                return h.response(result).code(200);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user","admin"]
                }
            }
        },

        //Adding category
        {
            method: "POST",
            path: "/categories",
            handler: async(request, h) => {
                const result = await controller.addCategory(request.payload)
                return h.response(result).code(201);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user","admin"]
                },
                validate: {
                    payload: Joi.object({
                        category_name: Joi.string().min(1).max(50).required()
                    })
                }
            }
        },

        //Getting specific category
        {
            method: "GET",
            path: "/categories/{id}",
            handler: async(request, h) => {
                const result = await controller.getCategory(request.params.id);
                return h.response(result).code(200);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user","admin"]
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    })
                }
            }
        },


        //Updating category
        {
            method: "PUT",
            path: "/categories/{id}",
            handler: async(request, h) => {
                const result = await controller.updateCategory(request.params.id, request.payload);
                return h.response(result).code(201);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user","admin"]
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    }),
                    payload: Joi.object({
                        category_name: Joi.string().min(1).max(50).required()
                    })
                }
            }
        },


        //Deleting category
        {
            method: "DELETE",
            path: "/categories/{id}",
            handler: async(request, h) => {
                const result = await controller.deleteCategory(request.params.id);
                return h.response(result).code(200);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user","admin"]
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    })
                }
            }
        }

    ]);
}