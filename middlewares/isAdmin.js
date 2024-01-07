function checkAdmin(req, res, next) {
    if (req.user.admin == true) {
      return next();
    }
    res.status(200).json({ ok: "error" });
}

module.exports = checkAdmin;