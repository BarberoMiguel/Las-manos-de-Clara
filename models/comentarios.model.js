const queries = require('../utils/queries')
const pool = require('../config/db_pgsql')

const getAllComentarios = async (id) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.getAllComentarios, [id])
        result = data.rows
        return result
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const postComentario = async (id, nombre, comentario) => {
    let client;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.postComentario, [id, nombre, comentario])
        return "success"
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const deleteComentario = async (comNum) => {
    let client;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.deleteComentario, [comNum])
        return "success"
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    } 
}

const products = {
    getAllComentarios,
    postComentario,
    deleteComentario
}
module.exports = products;