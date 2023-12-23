const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const checkToken = require("../middlewares/checkToken");


const signupController = require("../controllers/signup.controller");
const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");
// const searchController = require("../controllers/search.controller");
// const moviesControllers = require("../controllers/movies.controller");
const productsController = require("../controllers/products.controller");

router.post("/login", loginController.loginMiddleware, loginController.loginFunction);
router.get("/google", signupController.signupFunction);
router.get("/signUp", signupController.signupFunction);
router.get("/logout", logoutController.logoutFunction);

router.get("/Products", productsController.getProducts);
// router.get("/detalle/:id?", );
// router.get("/comentarios/:id", moviesControllers.getMovies);
// router.post("/addFavorito/:id", isAuthenticated, checkToken, moviesControllers.createMoviesForm);
// router.delete("/borrarFavorito/:id", isAuthenticated, checkToken, moviesControllers.editMoviesForm);
// router.post("/addAviso/:id", isAuthenticated, checkToken, moviesControllers.createMoviesForm);
     

module.exports = router;
