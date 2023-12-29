const queries = require('../utils/queries')
const pool = require('../config/db_pgsql')

const getAllFavoritos = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.getAllFavoritos, [email])
        result = data.rows
        return result
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const addFavorito = async (id, email) => {
    let client;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.addFavorito, [id, email])
        return "success"
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const deleteFavorito = async (id) => {
    let client;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.deleteFavorito, [id])
        return "success"
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const products = {
    getAllFavoritos,
    addFavorito,
    deleteFavorito
}
module.exports = products;