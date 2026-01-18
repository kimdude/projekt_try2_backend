"use strict"

const controller = require("../controllers/user.controller");
const Joi = require("joi");

//User routes
module.exports = (server) => {
    server.route([

        //Test route
        {
            method: "GET",
            path: "/",
            handler: async(request, h) => {
                return h.response({ message: "Welcome!" }).code(200);
            }
        },

        //Logging in user
        {
            method: "POST",
            path: "/login",
            handler: async(request, h) => {
                const result = await controller.loginUser(request.payload);
                return h.response(result).code(201);
            },
            options: {
                validate: {
                    payload: Joi.object({
                        username: Joi.string().min(1).max(25).required(),
                        password: Joi.string().min(1).max(255).required(),
                    })
                }
            }
        },

        //Getting user info
        {
            method: "GET",
            path: "/user",
            handler: async(request, h) => {

                //Fetching id from credentials
                const userId = request.auth.credentials.id;
                const result = await controller.findInfo(userId);

                return h.response(result).code(200);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user","admin"]
                }
            }
        },

        //Update password
        {
            method: "PUT",
            path: "/user",
            handler: async(request, h) => {

                //Fetching id from credentials
                const userId = request.auth.credentials.id;
                const result = await controller.updateUser(userId, request.payload);

                return h.response(result).code(201);
            },
            options: {
                auth: {
                    strategy: "jwt",
                    scope: ["user","admin"]
                },
                validate: {
                    payload: Joi.object({
                        password: Joi.string().min(1).max(255).required(),
                        newPassword: Joi.string().min(1).max(255).required(),
                    })
                }
            }
        },
    ]);
}