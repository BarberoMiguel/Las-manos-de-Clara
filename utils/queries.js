const queries = {
    getAllProducts: `
    SELECT *
    FROM productos`,
    createUser: `INSERT INTO users (email, name, password, admin)
    VALUES ($1, $2, $3, $4)`,
    datosEmail: `SELECT email, admin, name
    FROM usuarios
    WHERE email=$1`,
    putPassword: `UPDATE users
    SET password=$2
    WHERE email=$1`,
}

module.exports = queries;