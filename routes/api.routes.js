const express = require('express');
var router = express.Router();
const ApiController = require("./../controllers/api");
const Auth = require("./../middleware/auth");

router.get("/authentication",[Auth.verifyToken], ApiController.getAuthenticateData);



module.exports = router;