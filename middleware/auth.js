const config = process.env;
const jwt = require('jsonwebtoken');
var commonServices = require("./commonServices");

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"] || localStorage.getItem('token');

  if (!token) {
    return res.status(403).send({message:"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log("fdsfdsf",decoded);
    req.user = decoded.token;
  } catch (err) {
    return res.status(401).send({message:"Invalid Token! Please genrate new by refresh token",API_ENDPOINT:"http://localhost:4001/getRefreshToken"});
  }
  return next();
};

const genrateJWTEncryptedToken= (length,uid) => {
  const token = jwt.sign(
    {token: commonServices.genrateEncryptedToken(length,uid)},
    process.env.TOKEN_KEY,
    {
      expiresIn: process.env.TOKEN_KEY_EXPIRES,
    }
  );
  return token;
};

module.exports = { 
  verifyToken, 
  genrateJWTEncryptedToken 
}