"use strict"

const Hapi = require("@hapi/hapi");
require("dotenv").config();

//Connecting to database
const client = require("./database/db");

//Validating JWT-token
const validate = async function(decoded, request, h) {
    try {
        const result = await client.query(`SELECT * FROM users WHERE user_id=$1`, [decoded.id]);
        const user = result.rows[0];

        if(!user) {
            return { isValid: false }
        }

        //Creating object for credentials
        const aboutUser = {
            id: decoded.id,
            username: user.username,
            scope: [user.role]
        }

        return { isValid: true, credentials: aboutUser }

    } catch(error) {
        console.log("An error occurred during validation: " + error.message);
    }
}

//Connecting to server 
const init = async() => {
    const server = Hapi.server({
        port: 5000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['Authorization', 'Content-type']
            }
        }
    });

    //Authentication with hapi-auth-jwt2
    await server.register(require("hapi-auth-jwt2"));
    server.auth.strategy("jwt", "jwt", {
        key: process.env.JWT_SECRET_KEY,
        validate
    });

    //Requiring routes


    

    await server.start();
    console.log("Server running on %s", server.info.uri);
}