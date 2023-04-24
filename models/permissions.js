const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  perm_name: { type: String, default: null },
  perm_description: { type: String, default: null }
});

module.exports = mongoose.model("permission", permissionSchema);