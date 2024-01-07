require("dotenv").config();
const jwt = require("jsonwebtoken");

async function checkToken(req, res, next) {
  try {
    const accessToken = await req.cookies['access-token'];
    const secretKey = process.env.secret;
    console.log("pruebacheck");
    jwt.verify(accessToken, secretKey, (err, decoded) => {
        if (err) {
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
          })
          next();
        } else {
          // El token es válido y decodificado contiene la información del token
          next();
        }
      
    });;
  } catch (error) {
    console.log(error);
  }
}

module.exports = checkToken;