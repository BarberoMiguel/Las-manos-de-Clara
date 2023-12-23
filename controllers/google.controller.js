const jwt = require("jsonwebtoken");
const signup = require('../models/signup.model');
const login = require('../models/login.model');


const loginFunction = async function (req, res) {
    const {email} = req.body;
    let userexists = await login.datosEmail(email);
    if (Object.keys(userexists).length === 0) {
        let failure = await signup.createGoogle(email, nombre);
        if (failure != undefined) {
            res.status(200).json('error');
        } else {
            userexists = await login.datosEmail(email);
        }
    }
    req.login(userexists, (err) => {
        if (err) {
            return res.status(200).json('error');
        }
    });
    const payload = {
        nombre: userexists.nombre,
        email: email,
        check: true
    };
    const token = jwt.sign(payload, `${process.env.secret}`, {
        expiresIn: "30m"
    });
    res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
    }).status(200).json('success'); 
}



module.exports = {
    loginFunction
};