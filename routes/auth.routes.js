const express = require('express');
var router = express.Router();
const AuthController = require("./../controllers/auth");
const Auth = require("./../middleware/auth");

router.post("/getRefreshToken",AuthController.getRefreshToken);

router.post("/genrateNewToken",AuthController.genrateNewToken);


module.exports = router;