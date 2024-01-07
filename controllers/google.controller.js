const {getPassport} = require('../config/passport-config');
const jwt = require("jsonwebtoken");
const signup = require('../models/signup.model');
const login = require('../models/login.model');


const loginFunction = async function (req, res) {
    const {email, nombre} = req.body;
    console.log("prueba1");
    passport = getPassport();
    let userexists = await login.datosEmail(email);
    if (Object.keys(userexists).length === 0) {
        let failure = await signup.createGoogle(email, nombre);
        if (failure != undefined) {
            res.status(200).json({ ok: 'error'});
        } else {
            userexists = await login.datosEmail(email);
        }
    } else {
        console.log("prueba2");
        passport.authenticate('local', (err, user, info) => {
            console.log(user);
            if (err) {
                res.status(500).json({ ok: 'error'});
            } else if (!user) {
                const message = info.message;
                if (message === "Usuario no encontrado") {
                    res.status(200).json({ ok: false});
                }
            } else {
                req.login(user, (err) => {
                    console.log(user);
                    if (err) {
                        return res.status(500).json({ ok: 'error'});
                    }
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
                    }).status(200).json({ ok: 'success',
                                            user: user}); 
                });
            }
        })(req, res);
    }
    }
module.exports = {
    loginFunction
};