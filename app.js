require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, "assets")));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Router declaration..
var userRouter = require('./routes/user.routes');
var authRouter = require('./routes/auth.routes');
var roleRouter = require('./routes/roles.routes');
var permissionRouter = require('./routes/permissions.routes');
var apiRouter = require('./routes/api.routes');

const authMiddleware = require('./middleware/auth');
// index page
app.get('/',authMiddleware.setUser,(req,res,next)=>{
    if(req.user) return res.redirect('/user/dashboard');
    else next();
}, function(req, res) {
    res.render('index');
});

app.use('/registration', authMiddleware.setUser,(req,res,next)=>{
    if(req.user) return res.redirect('/user/dashboard');
    else next();
}, function(req, res) {
    res.render('registration');
});

app.use('/login', authMiddleware.setUser,(req,res,next)=>{
    if(req.user) return res.redirect('/user/dashboard');
    else next();
}, function(req, res) {
    res.render('login');
});

app.use('/logout', function(req,res){
    res.render('index');
});

app.use('/api', apiRouter); 
app.use('/user', userRouter); 
app.use('/auth', authRouter); 
app.use('/role', roleRouter); 
app.use('/role/permission',permissionRouter)

module.exports = app;