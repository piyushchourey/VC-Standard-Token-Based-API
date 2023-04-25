var mongoose = require('mongoose')
, Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  user_sess_token: { type: String },
  refreshToken: { type: String },
  api_token :{ type: String },
  role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'role'
  }
});

module.exports = mongoose.model("user", userSchema);