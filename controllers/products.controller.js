const products = require('../models/products.model');


const getProducts = async (req, res) => {
    try {
        let results = await products.getAllProducts();
        res.status(200).json(results);
      } catch (error) {
        res.status(400).json({ msg: `ERROR: ${error.stack}` });
      }
}

const getDetail = async (req, res) => {
  let id = req.params.id;
  try {
      let results = await products.getDetails(id);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
}

const createProduct = async (req, res) => {
  const {nombre, coleccion, descripcion, precio, stock, imagenes, color} = req.body;
  try {
      let results = await products.createProduct(nombre, coleccion, descripcion, precio, stock, imagenes, color);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
}

const updateProduct = async (req, res) => {
  let id = req.params.id;
  const {nombre, coleccion, descripcion, precio, stock, imagenes, color} = req.body;
  try {
      let results = await products.updateProduct(id, nombre, coleccion, descripcion, precio, stock, imagenes, color);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
}

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  try {
      let results = await products.deleteProduct(id);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
}

module.exports = {
    getProducts,
    getDetail,
    createProduct,
    updateProduct,
    deleteProduct
}