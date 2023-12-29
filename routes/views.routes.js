const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const checkToken = require("../middlewares/checkToken");


const signupController = require("../controllers/signup.controller");
const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");
const comentarioController = require("../controllers/comentario.controller");
const favoritoController = require("../controllers/favoritos.controller");
const avisoController = require("../controllers/avisos.controller");
const productsController = require("../controllers/products.controller");

router.post("/login", loginController.loginMiddleware, loginController.loginFunction);
router.get("/google", signupController.signupFunction);
router.get("/signUp", signupController.signupFunction);
router.get("/logout", logoutController.logoutFunction);
router.get("/getInfo",  isAuthenticated, checkToken, loginController.getInfo);
router.put("/updateInfo",  isAuthenticated, checkToken, loginController.updateInfo);


router.get("/Products", productsController.getProducts);
router.get("/detalle/:id", productsController.getDetail);
router.get("/comentarios/:id", comentarioController.getComentarios);
router.post("/comentarios/:id", isAuthenticated, checkToken, comentarioController.postComentario);
router.get("/getFavoritos/:email", isAuthenticated, checkToken, favoritoController.getFavoritos);
router.post("/addFavorito/:id", isAuthenticated, checkToken, favoritoController.postFavorito);
router.delete("/borrarFavorito/:id", isAuthenticated, checkToken, favoritoController.deleteFavorito);
router.post("/addAviso/:id", isAuthenticated, checkToken, avisoController.postAviso);
     

module.exports = router;
