const comentarios = require('../models/comentarios.model');


const getComentarios = async (req, res) => {
  let id = req.params.id;
    try {
        let results = await comentarios.getAllComentarios(id);
        res.status(200).json(results);
      } catch (error) {
        res.status(400).json({ msg: `ERROR: ${error.stack}` });
      }
}

const postComentario = async (req, res) => {
  let id = req.params.id;
  const {comentario} = req.body;
  try {
      let results = await comentarios.postComentario(id, req.user.nombre, comentario);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
}

const deleteComentario = async (req, res) => {
  let comNum = req.params.comNum;
  try {
      let results = await comentarios.deleteComentario(comNum);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
}

module.exports = {
    getComentarios,
    postComentario,
    deleteComentario
}