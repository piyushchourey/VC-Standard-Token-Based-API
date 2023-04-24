const express = require('express');
var router = express.Router();
const Roles = require("../controllers/roles");
const Auth = require("../middleware/auth");

router.post("/add",Roles.add);

router.get("/fetchAll",Roles.getData);


module.exports = router;