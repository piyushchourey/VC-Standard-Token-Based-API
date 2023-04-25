const express = require('express');
var router = express.Router();
const User = require("./../controllers/user");
const Auth = require("./../middleware/auth");

router.post("/register",User.register);

router.post("/login",User.login);

router.get("/dashboard", User.getData);

router.get("/getData", [Auth.verifyToken], User.getData);

module.exports = router;
