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

const products = {
    getAllProducts
}
module.exports = products;