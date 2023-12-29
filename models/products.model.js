const queries = require('../utils/queries')
const pool = require('../config/db_pgsql')

const getAllProducts = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.getAllProducts)
        result = data.rows
        return result
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const getDetails = async (id) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.getProduct, [id])
        result = data.rows
        return result
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const createProduct = async (nombre, coleccion, descripcion, precio, stock, imagenes, color) => {
    let client;
    let talla = "L";
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.createProduct, [nombre, coleccion, descripcion, precio, stock, imagenes, talla, color])
        return "success"
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const updateProduct = async (id, nombre, coleccion, descripcion, precio, stock, imagenes, color) => {
    let client;
    let talla = "L";
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.updateProduct, [id, nombre, coleccion, descripcion, precio, stock, imagenes, talla, color])
        return "success"
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const deleteProduct = async (id) => {
    let client;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.deleteProduct, [id])
        return "success"
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const products = {
    getAllProducts,
    getDetails,
    createProduct,
    updateProduct,
    deleteProduct
}
module.exports = products;