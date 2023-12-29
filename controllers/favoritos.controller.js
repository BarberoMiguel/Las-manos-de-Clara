const favoritos = require('../models/favoritos.model');


const getFavoritos = async (req, res) => {
  let email = req.params.email;
    try {
        let results = await favoritos.getAllFavoritos(email);
        res.status(200).json(results);
      } catch (error) {
        res.status(400).json({ msg: `ERROR: ${error.stack}` });
      }
}

const postFavorito = async (req, res) => {
  let id = req.params.id;
  try {
      let results = await favoritos.addFavorito(id, req.user.email);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
}

const deleteFavorito = async (req, res) => {
  let id = req.params.id;
  try {
      let results = await favoritos.deleteFavorito(id);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
}

module.exports = {
    getFavoritos,
    postFavorito,
    deleteFavorito
}