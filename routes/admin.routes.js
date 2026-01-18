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
                return h.response({ result });
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
        }
        
    ]);
}