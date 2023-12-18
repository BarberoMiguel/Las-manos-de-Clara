const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const checkToken = require("../middlewares/checkToken");
const isAdmin = require("../middlewares/isAdmin");

const productsController = require("../controllers/products.controller");

// Rutas de la API con protección
// router.post("/crearProducto", isAuthenticated, checkToken, productsController.createProduct);
// router.put("/editarProducto/:id", isAuthenticated, checkToken, isAdmin, );
// router.delete("/borrarProducto/:id", isAuthenticated, checkToken, isAdmin, );
// router.delete("/borrarAviso/:id_producto", isAuthenticated, checkToken, isAdmin, );
// router.delete("/borrarComentario/:comNum", isAuthenticated, checkToken, isAdmin, );

module.exports = router;
