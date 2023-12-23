
const logoutFunction = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.clearCookie("access-token").status(200).json('success');
    });
};

module.exports = {
    logoutFunction
}