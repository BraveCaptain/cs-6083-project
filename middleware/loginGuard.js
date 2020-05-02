const guard = (req, res, next) => {
    if(req.url != '/login' && req.url != '/register' && !req.session.userid) {
        res.redirect('/login');
    } else {
        next();
    }
}
module.exports = guard;