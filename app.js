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
app.use(express.static(path.join(__dirname, 'public')));

//router module
const login = require('./routes/login');
const register = require('./routes/register');
const dashboard = require('./routes/dashboard');

app.use('/', require('./middleware/loginGuard'));

//apply module for request
app.use('/login', login);
app.use('/register', register);
app.use('/dashboard', dashboard);

//listen port 3000
app.listen(3000);
console.log('Server started');