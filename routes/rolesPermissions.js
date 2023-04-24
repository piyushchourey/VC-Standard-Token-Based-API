const express = require('express');
var router = express.Router();
const RolesPermission = require("../controllers/rolesPermissions.routes");
const Auth = require("../middleware/auth");

router.post("/add",RolesPermission.add);

router.get("/fetchAll",RolesPermission.getData);

module.exports = router;