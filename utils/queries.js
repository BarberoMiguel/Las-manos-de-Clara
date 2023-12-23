const queries = {
    checkEmail: `
    SELECT *
    FROM usuarios
    WHERE email=$1`,
    createUser: `INSERT INTO usuarios (email, nombre, admin)
    VALUES ($1, $2, $3)`,
    createGoogle: `
    INSERT INTO usuarios (email, nombre, admin)
    VALUES ($1, $2, $3)`,
    datosEmail: `SELECT email, nombre, admin
    FROM usuarios
    WHERE email=$1`,
    getAllProducts: `
    SELECT *
    FROM productos`,
}

module.exports = queries;