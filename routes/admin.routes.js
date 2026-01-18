"use strict"

const controller = require("../controllers/admin.controller");
const Joi = require("joi");

//Admin routes
module.exports = (server) => {
    server.route([

        //Adding user
        {
            method: "POST",
            path: "/admin",
            handler: async(request, h) => {
                const result = await controller.addUser(request.payload);
                return h.response({ result }).code(201);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["admin"]
                },
                validate: {
                    payload: Joi.object({
                        role: Joi.string().min(1).max(15).required(),
                        fname: Joi.string().min(1).max(10).required(),
                        lname: Joi.string().min(1).max(15).required(),
                        username: Joi.string().min(1).max(25).required(),
                        password: Joi.string().min(1).max(255).required()
                    })
                }
            }
        },

        //Getting all users
        {
            method: "GET",
            path: "/admin",
            handler: async(request, h) => {
                const result = await controller.findUsers();
                return h.response({ result }).code(200);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["admin"]
                }
            }
        },

        //Getting specific user
        {
            method: "GET",
            path: "/admin/{id}",
            handler: async(request, h) => {
                const result = await controller.findUser(request.params.id);
                return h.response({ result }).code(200);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["admin"]
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    })
                }
            }
        },

        //Updating user role
        {
            method: "PUT",
            path: "/admin/{id}",
            handler: async(request, h) => {
                const result = await controller.updateUser(request.params.id, request.payload);
                return h.response({ result }).code(200);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["admin"]
                },
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required()
                    }),
                    payload: Joi.object({
                        role: Joi.string().min(1).max(15).required()
                    })
                }
            }
        },
        
    ]);
}