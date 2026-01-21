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

//Checking if tables exist
client.query(`
    DROP VIEW IF EXISTS products_details;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS shelves CASCADE;
    DROP TABLE IF EXISTS categories CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
`);

//Table with users
client.query(`
    CREATE TABLE users(
        user_id     SERIAL PRIMARY KEY,
        role        VARCHAR(15) NOT NULL,
        fname       VARCHAR(10) NOT NULL,
        lname       VARCHAR(15) NOT NULL,
        username    VARCHAR(25) UNIQUE NOT NULL,
        password    VARCHAR(255) NOT NULL,
        added       TIMESTAMPTZ DEFAULT NOW(),
        active      BOOLEAN DEFAULT true
    );
`);

//Table with shelf units
client.query(`
    CREATE TABLE shelves(
        shelf_id    SERIAL PRIMARY KEY,
        shelf       VARCHAR(5) NOT NULL
    );
`);

//Table with categories
client.query(`
    CREATE TABLE categories(
        category_id     SERIAL PRIMARY KEY,
        category_name   VARCHAR(50) NOT NULL
    );
`);

//Table with products
client.query(`
    CREATE TABLE products(
        product_id  SERIAL PRIMARY KEY,
        ean_code    VARCHAR(13) UNIQUE,
        product_name    VARCHAR(50) NOT NULL,
        label       VARCHAR(30) NOT NULL,
        description VARCHAR(80),
        price       INT NOT NULL,
        amount      INT DEFAULT 0,
        status      VARCHAR(15) NOT NULL,
        added       TIMESTAMPTZ DEFAULT NOW(),
        shelf_id    INT REFERENCES shelves(shelf_id),
        category_id INT REFERENCES categories(category_id),
        user_id     INT REFERENCES users(user_id)
    );
`);

//View
client.query(`
    CREATE VIEW products_details AS
    SELECT products.product_name,  products.ean_code, products.label, products.description, products.price,  products.status,  products.amount, products.added, categories.category_name, shelves.shelf, users.fname, users.lname
    FROM products
    LEFT JOIN users ON users.user_id = products.user_id
    LEFT JOIN shelves ON shelves.shelf_id = products.shelf_id
    LEFT JOIN categories ON categories.category_id = products.category_id
    ORDER BY products.product_name;
`);

//Test data
client.query(`
    INSERT INTO users(username, fname, lname, role, password)
    VALUES
        ('lagerpersonal', 'Lena', 'Lööf', 'admin','test123');
`);

client.query(`
    INSERT INTO shelves(shelf)
    VALUES 
        ('A1'),
        ('A2'),
        ('A3'),
        ('B1'),
        ('B2'),
        ('B3'),
        ('C1'),
        ('C2'),
        ('C3'),
        ('D1'),
        ('D2'),
        ('D3'),
        ('E1'),
        ('E2'),
        ('E3'),
        ('F1'),
        ('F2'),
        ('F3'),
        ('G1'),
        ('G2'),
        ('G3');
`);

client.query(`
    INSERT INTO categories(category_name)
    VALUES
        ('Våffeljärn'),
        ('Köksassistenter'),
        ('Brödrostare'),
        ('Tryckkokare'),
        ('Elvispar'),
        ('Iskrossare'),
        ('Airfryers'),
        ('Kaffemaskiner'),
        ('Vattenkokare');
`);

client.query(`
    INSERT INTO products(ean_code, product_name, label, description, price, amount, status, category_id, shelf_id, user_id)
    VALUES
        ('1234567891111', 'Köksmaskin Royal Blue','Ankarsrum', 'Tålig och prisvärd köksmaskin som passar alla.', 7399, 15, 'I lager', 1, 1, 1),
        ('1234567891112', 'Våffeljärn Svart', 'Champion', 'Dubbelt våffeljärn', 549, 8, 'I lager', 1, 1, 1),
        ('1234567891113', 'Våffeljärn Röd', 'Champion', 'Dubbelt våffeljärn', 549, 6, 'I lager', 1, 1, 1),
        ('1234567891114', 'Brödrost Röd 2 skivor', 'Smeg', 'Brödrost för 2 skivor i vintage stil.', 1996, 0, 'Beställd', 1, 1, 1);
`);