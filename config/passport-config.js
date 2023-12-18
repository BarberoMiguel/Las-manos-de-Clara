const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const login = require('../models/login.model');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, done) => {
  try {
    let emailSigned = await login.datosEmail(email);
    if (Object.keys(emailSigned).length === 0) {
      return done(null, false, { message: 'Usuario no encontrado' });
    } else {
      const user = emailSigned;
      return done(null, user);
    }   
    } catch (error) {
    return done(error);
  }
}));

module.exports = passport;