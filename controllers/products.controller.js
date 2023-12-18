const products = require('../models/products.model');


const getProducts = async (req, res) => {
    try {
        let results = await products.getAllProducts();
        res.status(200).json(results);
      } catch (error) {
        res.status(400).json({ msg: `ERROR: ${error.stack}` });
      }
}

module.exports = {
    getProducts
}