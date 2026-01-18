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
                const result = await controller.getAllProducts();
                return h.response(result).code(200);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user", "admin"]
                }
            }
        },

        //Adding product
        {
            method: "POST",
            path: "/products",
            handler: async(request, h) => {
                const userId = request.auth.credentials.id;
                const result = await controller.addProduct(userId, request.payload);

                return h.response(result).code(201);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user", "admin"]
                },
                validate: {
                    payload: Joi.object({
                        ean_code: Joi.string().min(8).max(13).required(), 
                        product_name: Joi.string().min(1).max(50).required(), 
                        label: Joi.string().min(1).max(30), 
                        description: Joi.string().min(1).max(80), 
                        price: Joi.number().integer().min(1).required(),  
                        amount: Joi.number().integer().min(0).required(),  
                        status: Joi.string().min(1).required(), 
                        shelf_id: Joi.number().integer().min(1).required(),
                        category_id: Joi.number().integer().min(1).required()
                    })
                }
            }
        },

        //Getting specific product
        {
            method: "GET",
            path: "/products/{id}",
            handler: async(request, h) => {
                const result = await controller.getProduct(request.params.id);
                return h.response(result).code(200);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user", "admin"]
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    })
                }
            }
        },

        //Updating product
        {
            method: "PUT",
            path: "/products/{id}",
            handler: async(request, h) => {
                const userId = request.auth.credentials.id;
                const result = await controller.editProduct(userId, request.params.id, request.payload);
                return h.response(result).code(201);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user", "admin"]
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    }),
                    payload: Joi.object({
                        ean_code: Joi.string().min(8).max(13).required(), 
                        product_name: Joi.string().min(1).max(50).required(), 
                        label: Joi.string().min(1).max(30), 
                        description: Joi.string().min(1).max(80), 
                        price: Joi.number().integer().min(1).required(),  
                        shelf_id: Joi.number().integer().min(1).required(),
                        category_id: Joi.number().integer().min(1).required()
                    })
                }
            }
        },

        //Editing stock
        {
            method: "PUT",
            path: "/products/{id}/stock",
            handler: async(request, h) => {
                const result = await controller.updateProduct(request.params.id, request.payload);
                return h.response(result).code(201);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user", "admin"]
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    }),
                    payload: Joi.object({
                        amount: Joi.number().integer().min(0).required(),  
                        status: Joi.string().min(1).required()
                    })
                }
            }
        },

        //Deleting product
        {
            method: "DELETE",
            path: "/products/{id}",
            handler: async(request, h) => {
                const result = await controller.deleteProduct(request.params.id);
                return h.response(result).code(200);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user", "admin"]
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    })
                }
            }
        },

        //Getting all shelves
        {
            method: "GET",
            path: "/shelves",
            handler: async(request, h) => {
                const result = await controller.getShelves();
                return h.response(result).code(200);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user", "admin"]
                }
            }
        }
    ]);
}