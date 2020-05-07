const express = require('express');
const path = require('path');
const session = require('express-session');
// use body-parser module  to handle post
const bodyparser = require('body-parser');
const app = express();

//use body-parser handle all get/post rquest
app.use(bodyparser.urlencoded({extended: false}));

app.use(session({
    secret: 'Dymatize Accelerate Wallet',
    resave: true,
    saveUninitialized: true
}));

//art directory
app.set('views', path.join(__dirname, 'views'));
//tell express standard attribute
app.set('view engine', 'art');

//tell standard engine for attribute
app.engine('art', require('express-art-template'));

//open static directory
app.use(express.static(path.join(__dirname, 'static')));

//router module
const userLogin = require('./routes/user/login');
const userRegister = require('./routes/user/register');
const userDashboard = require('./routes/user/dashboard');
const userHomeRegister = require('./routes/user/homeRegister');
const userHomeDisplay = require('./routes/user/homeDisplay');
const userHomeInsuranceSelect = require('./routes/user/homeInsuranceSelect');
const userHomeInsurancePay = require('./routes/user/homeInsurancePay');
const userAutoRegister = require('./routes/user/autoRegister');
const userAutoDisplay = require('./routes/user/autoDisplay');
const userAutoInsuranceSelect = require('./routes/user/autoInsuranceSelect');
const userAutoInsurancePay = require('./routes/user/autoInsurancePay');
const userDriverRegister = require('./routes/user/driverRegister');
const userDriverDisplay = require('./routes/user/driverDisplay');
const userHomeInvoiceDisplay = require('./routes/user/homeInvoiceDisplay');
const userAutoInvoiceDisplay = require('./routes/user/autoInvoiceDisplay');
const userHomePayDisplay = require('./routes/user/homePayDisplay');
const userAutoPayDisplay = require('./routes/user/autoPayDisplay');

const adminLogin = require('./routes/admin/login');
const adminRegister = require('./routes/admin/register');
const adminDashboard = require('./routes/admin/dashboard');
const adminUserDisplay = require('./routes/admin/userDisplay');
const adminPolicyDisplay = require('./routes/admin/policyDisplay');
const adminPolicyRegister = require('./routes/admin/policyRegister');
const adminHomeDisplay = require('./routes/admin/homeDisplay');
const adminAutoDisplay = require('./routes/admin/autoDisplay');
const adminHomeInvoiceDisplay = require('./routes/admin/homeInvoiceDisplay');
const adminAutoInvoiceDisplay = require('./routes/admin/autoInvoiceDisplay');
const adminHomePayDisplay = require('./routes/admin/homePayDisplay');
const adminAutoPayDisplay = require('./routes/admin/autoPayDisplay');
app.use('/', require('./middleware/loginGuard'));

//apply module for request

//admin
app.use('/admin/login', adminLogin);
app.use('/admin/register', adminRegister);
app.use('/admin/dashboard', adminDashboard);

app.use('/admin/adminUserDisplay', adminUserDisplay);

app.use('/admin/adminPolicyDisplay', adminPolicyDisplay);
app.use('/admin/adminPolicyRegister', adminPolicyRegister);

app.use('/admin/adminHomeDisplay', adminHomeDisplay);
app.use('/admin/adminAutoDisplay', adminAutoDisplay);
app.use('/admin/adminHomeInvoiceDisplay', adminHomeInvoiceDisplay);
app.use('/admin/adminAutoInvoiceDisplay', adminAutoInvoiceDisplay);
app.use('/admin/adminHomePayDisplay', adminHomePayDisplay);
app.use('/admin/adminAutoPayDisplay', adminAutoPayDisplay);



//user
app.use('/login', userLogin);
app.use('/register', userRegister);
app.use('/dashboard', userDashboard);

app.use('/homeRegister', userHomeRegister);
app.use('/homeDisplay', userHomeDisplay);
app.use('/homeInsuranceSelect', userHomeInsuranceSelect);
app.use('/homeInsurancePay', userHomeInsurancePay);

app.use('/autoRegister', userAutoRegister);
app.use('/autoDisplay', userAutoDisplay);
app.use('/autoInsuranceSelect', userAutoInsuranceSelect);
app.use('/autoInsurancePay', userAutoInsurancePay);

app.use('/driverRegister', userDriverRegister);
app.use('/driverDisplay', userDriverDisplay);

app.use('/homeInvoiceDisplay', userHomeInvoiceDisplay);
app.use('/autoInvoiceDisplay', userAutoInvoiceDisplay);
app.use('/homePayDisplay', userHomePayDisplay);
app.use('/autoPayDisplay', userAutoPayDisplay);

//listen port 3000
app.listen(3000);
console.log('Server started');