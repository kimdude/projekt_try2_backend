"use strict"

const client = require("../database/db");
const bcrypt = require('bcrypt');

/* Product routes */
//Getting all products
exports.findAll = async() => {
    try {
        const result = await client.query(`SELECT * FROM products;`);

        if(result.rows.length === 0) {
            return null;
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
exports.add = async(userId, data) => {
    try {
        const { ean_code, product_name, label, description, price, amount, status, shelf_id, category_id } = data;

        const result = await client.query(`INSERT INTO products(ean_code, product_name, label, description, price, amount, status, shelf_id, category_id, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`,
            [ean_code, product_name, label, description, price, amount, status, shelf_id, category_id, userId]
        );

        if(result.rows.length === 0) {
            throw new Error("A conflict occurred while adding product");
        }

        return result.rows[0];

    } catch(error) {

        //Creating error
        const newError = new Error("DB_ERROR_ADDING_PRODUCTS_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}

//Getting specific product
exports.find = async(id) => {
    try {
        const result = await client.query(`SELECT * FROM products_details WHERE product_id=$1;`,[id]);

        //Validating result
        if(result.rows.length === 0) {  
            throw new Error("Invalid product ID");
        }

        return result.rows[0];

    } catch(error) {

        //Creating error
        const newError = new Error("DB_ERROR_FETCHING_PRODUCT_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}

//Updating product
exports.edit = async(userId, productId, data) => {
    try {
        const { ean_code, product_name, label, description, price, shelf_id, category_id } = data;

        const result = await client.query(`UPDATE products SET ean_code=$1, product_name=$2, label=$3, description=$4, price=$5, shelf_id=$6, category_id=$7, user_id=$8 WHERE product_id=$9 RETURNING *;`,
            [ean_code, product_name, label, description, price, shelf_id, category_id, userId, productId]
        );

        if(result.rows.length === 0) {
            throw new Error("Invalid product ID");
        }

        return result.rows[0];

    } catch(error) {
        
        //Creating error
        const newError = new Error("DB_ERROR_EDITING_PRODUCT_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}

//Updating product stock
exports.update = async(productId, data) => {
    try {
        const { status, amount } = data;

        const result = await client.query(`UPDATE products SET status=$1, amount=$2 WHERE product_id=$3 RETURNING *;`, [status, amount, productId]);

        if(result.rows.length === 0) {
            throw new Error("Invalid product ID");
        }

        return result.rows[0];

    } catch(error) {
        console.log(error)

        //Creating error
        const newError = new Error("DB_ERROR_UPDATING_STOCK_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}

//Deleting product
exports.delete = async(id) => {
    try {
        const result = await client.query(`DELETE FROM products WHERE product_id=$1 RETURNING product_name;`, [id]);

        if(result.rows.length === 0) {
            throw new Error("Invalid product ID");
        }

        return result.rows[0];

    } catch(error) {

        //Creating error
        const newError = new Error("DB_ERROR_DELETING_PRODUCT_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}

//Getting all shelves
exports.findShelves = async() => {
    try {
        const result = await client.query(`SELECT * FROM shelves;`);

        if(result.rows.length === 0) {
            return null;
        }

        return result.rows;

    } catch(error) {

        //Creating error
        const newError = new Error("DB_ERROR_FETCHING_SHELVES_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}