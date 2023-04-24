const mongoose = require("mongoose");

const rolePermissionSchema = new mongoose.Schema({
  roles_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'role'
},
  perm_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'permission'
}
});

module.exports = mongoose.model("rolesPermission", rolePermissionSchema);