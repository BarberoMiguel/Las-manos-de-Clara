const avisos = require('../models/avisos.model');


const getAvisos = async (req, res) => {
  let id = req.params.id;
    try {
        let results = await avisos.getAvisos(id);
        res.status(200).json(results);
      } catch (error) {
        res.status(400).json({ msg: `ERROR: ${error.stack}` });
      }
}

const postAviso = async (req, res) => {
  let id = req.params.id;
  try {
      let results = await avisos.postAviso(id, req.user.email);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
}

const deleteAvisos = async (req, res) => {
  let id = req.params.id;
  try {
      let results = await avisos.deleteAvisos(id);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
}

module.exports = {
    getAvisos,
    postAviso,
    deleteAvisos
}