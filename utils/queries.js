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
    getInfo: `SELECT *
    FROM usuarios
    WHERE email=$1`,
    updateInfo: `
    UPDATE usuarios
    SET nombre=$2, ciudad=$3, calle_numero=$4, piso_puerta=$5, codigo_postal=$6
    WHERE email=$1`,
    getAllProducts: `
    SELECT *
    FROM productos`,
    getProduct: `
    SELECT *
    FROM productos
    WHERE id=$1`,
    getAllComentarios: `
    SELECT *
    FROM comentarios
    WHERE id_producto=$1`,
    postComentario: `
    INSERT INTO comentarios (nombre_usuario, id_producto, comentario)
    VALUES ($2, $1, $3)`,
    deleteComentario: `
    DELETE
    FROM comentarios
    WHERE comNum=$1`,
    getAllFavoritos: `
    SELECT *
    FROM favoritos
    WHERE email=$1`,
    addFavorito: `
    INSERT INTO favoritos (id_producto, email)
    VALUES ($1, $2)`,
    deleteFavorito: `
    DELETE
    FROM favoritos
    WHERE favnum=$1`,
    postAviso: `
    INSERT INTO aviso (id_producto, email)
    VALUES ($1, $2)`,
    getAvisos: `
    SELECT *
    FROM aviso
    WHERE id_producto=$1`,
    deleteAvisos: `
    DELETE
    FROM aviso
    WHERE id_producto=$1`,
    createProduct: `
    INSERT INTO productos (nombre, coleccion, descripcion, precio, stock, imagenes, talla, color)
    VALUES ($1, $2, $3, $4, %5, $6, $7, $8)`,
    updateProduct: `
    UPDATE productos
    SET nombre=$2, coleccion=$3, descripcion=$4, precio=$5, stock=$6, imagenes=$7, talla=$8, color=$9
    WHERE id=$1`,
    deleteProduct: `
    DELETE
    FROM favoritos
    WHERE id_producto=$1;
    DELETE
    FROM comentarios
    WHERE id_producto=$1;
    DELETE
    FROM aviso
    WHERE id_producto=$1;
    DELETE
    FROM productos
    WHERE id=$1`,
}

module.exports = queries;