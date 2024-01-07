function checkLogin(req, res, next) {
  console.log("pruebauser");
    if (req.user ) {
      return next();
    }
    console.log("pruebauser2");
    res.status(200).json({ ok: "error" });
}

module.exports = checkLogin;
