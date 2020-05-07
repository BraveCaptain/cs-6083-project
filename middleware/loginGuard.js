const guard = (req, res, next) => {
    // if(req.url != '/login' && req.url != '/register' && !req.session.userid) {
    //     res.redirect('/login');
    // } else {
    //     next();
    // }
    const url = req.url;
    const didUserLogin = req.session.userid;
    const didAdminLogin = req.session.adminid;
    if(url == '/error') {
        next();
        return;
    }
    if(!didUserLogin && !didAdminLogin) {
        if(url != '/login' && url != '/register' && url != '/admin/login' && url != '/admin/register') {
            res.redirect('/error');
        } else{
            next();
        }
    } else if(didUserLogin && !didAdminLogin) {
        if(url == '/admin/dashboard' || url == '/admin/logout' ||url == '/admin/adminUserDisplay' ||url == '/admin/adminPolicyDisplay' ||url == '/admin/adminPolicyRegister' ||url == '/admin/adminHomeDisplay' ||url == '/admin/adminAutoDisplay' ||url == '/admin/adminHomeInvoiceDisplay' ||url == '/admin/adminAutoInvoiceDisplay' ||url == '/admin/adminHomePayDisplay' ||url == '/admin/adminAutoPayDisplay' ||url == '/admin/adminDriverDisplay') {
            res.redirect('/admin/login');
        } else if (url == '/login' || url == '/register'){
            res.redirect('/dashboard');
        } else {
            next();
        }
    } else {
        next();
    }
}
module.exports = guard;