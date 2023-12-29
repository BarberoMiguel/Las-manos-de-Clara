const passport = require('../config/passport-config');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signup = require('../models/signup.model');

const loginFunction = async function (req, res) {
    try {
        let email = req.user.email;
        let nombre = req.user.nombre;
        const payload = {
        nombre: nombre,
        email: email,
        check: true
        };
        const token = jwt.sign(payload, `${process.env.secret}`, {
        expiresIn: "30m"
        });
        res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
        }).status(200).json("success");
    } catch (error) {
        console.error('Error en loginFunction:', error);
    }
}

const loginMiddleware = async function (req, res, next) {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                res.status(500).json("error");
            } else if (!user) {
                const message = info.message;
                if (message === "Usuario no encontrado") {
                    res.status(200).json(false);
                }
            } else {
                req.login(user, (err) => {
                    if (err) {
                        return res.status(500).json("error");
                    }
                    return next();
                });
            }
        })(req, res, next); 
    } catch (error) {
        console.log('Error en loginMiddleware:', error);
        res.status(500).send('Error interno del servidor');
    }
}

const getInfo = async (req, res) => {
    try {
        let results = await signup.getInfo(req.user.email);
        res.status(200).json(results);
      } catch (error) {
        res.status(400).json({ msg: `ERROR: ${error.stack}` });
      }
}

const updateInfo = async (req, res) => {
    const {nombre, ciudad, calle, piso, codigo} = req.body;
    try {
        let results = await signup.updateInfo(req.user.email, nombre, ciudad, calle, piso, codigo);
        res.status(200).json(results);
      } catch (error) {
        res.status(400).json({ msg: `ERROR: ${error.stack}` });
      }
  }

module.exports = {
    loginFunction,
    loginMiddleware,
    getInfo,
    updateInfo
};