require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, "assets")));


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Router declaration..
var userRouter = require('./routes/user.routes');
var authRouter = require('./routes/auth.routes');
var roleRouter = require('./routes/roles.routes');
var permissionRouter = require('./routes/permissions.routes');

// index page
app.get('/', function(req, res) {
    res.render('index');
});
app.use('/registration', function(req, res) {
    res.render('registration');
});
app.use('/login', function(req, res) {
    res.render('login');
});



app.use('/logout', function(req,res){
    res.render('index');
});

app.use('/user', userRouter); 
app.use('/auth', authRouter); 
app.use('/role', roleRouter); 
app.use('/role/permission',permissionRouter)

module.exports = app;