"use strict"

const client = require("../database/db");
const bcrypt = require('bcrypt');

/* Product routes */
//Getting all products
exports.findAll = async() => {
    try {
        const result = await client.query(`SELECT * FROM products;`);

        //Validating result
        if(result.rows.length === 0) {
            throw new Error("An error occurred while fetching all products");
        }

        return result.rows;

    } catch(error) {

        //Creating error
        const newError = new Error("DB_ERROR_FETCHING_PRODUCTS_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}

//Adding product
exports.add = async(data) => {
    try {
        { ean_code, product_name, label, description, price }


        /*         ean_code    VARCHAR(13) UNIQUE,
        product_name    VARCHAR(50) NOT NULL,
        label       VARCHAR(30) NOT NULL,
        description VARCHAR(80),
        price       INT NOT NULL,
        amount      INT DEFAULT 0,
        status      VARCHAR(15) NOT NULL,
        added       TIMESTAMPTZ DEFAULT NOW(),
        shelf_id    INT REFERENCES shelves(shelf_id),
        category_id INT REFERENCES categories(category_id),
        user_id     INT REFERENCES users(user_id) */


        if(result.rows.length === 0) {
            throw new Error();
        }

    } catch(error) {
        
    }
}

//Getting specific product
exports.find = async(id) => {
    try {

    } catch(error) {
        
    }
}

//Updating product
exports.edit = async(id, data) => {
    try {

    } catch(error) {
        
    }
}

//Updating product stock
exports.update = async(id, data) => {
    try {

    } catch(error) {
        
    }
}

//Deleting product
exports.delete = async(id) => {
    try {

    } catch(error) {
        
    }
}