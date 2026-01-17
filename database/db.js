"use strict"

const { Client } = require("pg");
require("dotenv").config();

//Connecting to database
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect((error) => {
    if(error) {
        console.log("An error occurred while connecting: " +  error);
    } else {
        console.log("Connected to database!");
    }
});

module.exports = client;