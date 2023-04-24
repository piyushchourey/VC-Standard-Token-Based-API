const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roles_name: { type: String, default: null },
  roles_description: { type: String, default: null }
});

module.exports = mongoose.model("role", roleSchema);