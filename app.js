const express = require('express');
const path = require('path');
const app = express();

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

//apply module for request
app.use('/login', login);
app.use('/register', register);

//listen port 3000
app.listen(3000);
console.log('Server started');