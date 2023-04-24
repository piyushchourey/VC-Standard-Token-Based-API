const express = require('express');
var router = express.Router();
const Permission = require("../controllers/permissions");
const Auth = require("../middleware/auth");

router.post("/add",Permission.add);

router.get("/fetchAll",Permission.getData);


module.exports = router;