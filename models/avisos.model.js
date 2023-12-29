const queries = require('../utils/queries')
const pool = require('../config/db_pgsql')

const getAvisos = async (id) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.getAvisos, [id])
        result = data.rows
        return result
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const postAviso = async (id, email) => {
    let client;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.postAviso, [id, email])
        return "success"
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const deleteAvisos = async (id) => {
    let client;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.deleteAvisos, [id])
        return "success"
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const products = {
    getAvisos,
    postAviso,
    deleteAvisos
}
module.exports = products;