const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const checkToken = require("../middlewares/checkToken");
const isAdmin = require("../middlewares/isAdmin");

const productsController = require("../controllers/products.controller");
const comentarioController = require("../controllers/comentario.controller");
const avisoController = require("../controllers/avisos.controller");

// Rutas de la API con protección
router.post("/crearProducto", isAuthenticated, checkToken, isAdmin, productsController.createProduct);
router.put("/editarProducto/:id", isAuthenticated, checkToken, isAdmin, productsController.updateProduct);
router.delete("/borrarProducto/:id", isAuthenticated, checkToken, isAdmin, productsController.deleteProduct);
router.post("/getAviso/:id", isAuthenticated, checkToken, isAdmin, avisoController.getAvisos);
router.delete("/borrarAviso/:id", isAuthenticated, checkToken, isAdmin, avisoController.deleteAvisos);
router.delete("/borrarComentario/:comNum", isAuthenticated, checkToken, isAdmin, comentarioController.deleteComentario);

module.exports = router;
