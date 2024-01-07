const LocalStrategy = require('passport-local').Strategy;
const login = require('../models/login.model');
let passport = null;

function initPassport(_passport) {
  passport = _passport;
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser(async (user, done) => {
    done(null, user);
  });
  
  passport.use(new LocalStrategy(async (email, nombre, done) => {
    try {
      console.log("prueba3");
      let emailSigned = await login.datosEmail(email);
      if (Object.keys(emailSigned).length === 0) {
        return done(null, false, { message: 'Usuario no encontrado' });
      } else {
        const user = emailSigned;
        console.log("usuario logueado");
        return done(null, user);
      }   
      } catch (error) {
      console.log(error);
      return done(error);
    }
  }));
}

function getPassport() {
  return passport;
}

module.exports = {initPassport, getPassport};