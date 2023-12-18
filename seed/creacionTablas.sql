CREATE TABLE usuarios (
    email VARCHAR(255) PRIMARY KEY NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    ciudad VARCHAR(255),
    calle_numero VARCHAR(255),
    piso_puerta VARCHAR(255),
    codigo_postal VARCHAR(10),
	UNIQUE(email)
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    coleccion VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    imagenes VARCHAR(255) ARRAY NOT NULL,
    talla VARCHAR(10),
    color VARCHAR(8) ARRAY NOT NULL
);

CREATE TABLE favoritos (
    favnum SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (email) REFERENCES usuarios(email),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);

CREATE TABLE comentarios (
    comNum SERIAL PRIMARY KEY NOT NULL,
    nombre_usuario VARCHAR(255) NOT NULL,
    id_producto INT NOT NULL,
    comentario TEXT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);

CREATE TABLE aviso (
    avisoid SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (email) REFERENCES usuarios(email),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);