"use strict"

const client = require("../database/db");
const bcrypt = require('bcrypt');

/* Category routes */
//Getting all categories
exports.findAll = async() => {
    try {
        const result = await client.query(`SELECT * FROM categories;`);

        //Validating result
        if(result.rows.length === 0) {
            return null;
        }

        return result.rows;

    } catch(error) {

        //Creating error
        const newError = new Error("DB_FETCHING_CATEGORIES_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}

//Adding category
exports.add = async(data) => {
    try {
        const { category_name } = data;

        const result = await client.query(`INSERT INTO categories(category_name) VALUES ($1) RETURNING *;`, [category_name]);

        //Validating result
        if(result.rows.length === 0) {
            throw new Error("A conflict occurred while adding category");
        }

        return result.rows;

    } catch(error) {

        //Creating error
        const newError = new Error("DB_ADDING_CATEGORY_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }
}

//Getting specific category
exports.find = async(id) => {
    try {
        const result = await client.query(`SELECT * FROM categories WHERE category_id=$1;`, [id]);

        if(result.rows.length === 0) {
            throw new Error("Invalid category ID");
        }

        return result.rows[0];

    } catch(error) {

        //Creating error
        const newError = new Error("DB_FETCHING_CATEGORY_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    } 
}

//Updating category
exports.update = async(id, data) => {
    try {
        const { category_name } = data;

        const result = await client.query(`UPDATE categories SET category_name=$1 WHERE category_id=$2 RETURNING category_name;`, [category_name, id]);

        if(result.rows.length === 0) {
            throw new Error("Invalid category ID");
        }

        return result.rows[0];

    } catch(error) {

        //Creating error
        const newError = new Error("DB_UPDATING_CATEGORY_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    }  
}

//Deleting category
exports.delete = async(id) => {
    try {

        //Deleting products with category
        await client.query(`DELETE FROM products WHERE category_id=$1 RETURNING product_name`, [id])

        //Deleting category
        const result = await client.query(`DELETE FROM categories WHERE category_id=$1 RETURNING category_name;`, [id]);


        if(result.rows.length === 0) {
            throw new Error("Invalid category ID");
        }

        return result.rows[0]

    } catch(error) {

        console.log(error)
        //Creating error
        const newError = new Error("DB_DELETING_CATEGORY_FAILED", { cause: error.message });
        newError.code = error.code;

        throw newError;
    } 
}