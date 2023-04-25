const User = require("./../models/user");
var bcrypt = require('bcryptjs');
const auth = require("./../middleware/auth");
var commonServices = require("./../middleware/commonServices");
const jwt = require("jsonwebtoken");
var _ = require('lodash');
const config = process.env;
var hexgen = require('hex-generator');

const register = async(req, res, next) => {
    // Our register logic starts here
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send({status:false,message:"All input is required"});
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(400).send({status:false,message:"User Already Exist. Please Login"});
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);

      //Genrate API token..
      var api_token  = auth.genrateJWTEncryptedToken(128,hexgen(90));

      // Create user in our database
      var user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        api_token :api_token
      });

      var user1 =  _.omit(user, ['_id', 'password','__v']);
      
      // return new user
      res.status(200).send({status:true,message:"Nice! You have registered successfully."});
    } catch (err) {
      console.log(err);
    }
};

const login = async(req, res, next) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send({status:false,message:"All input is required"});
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
  
          // Create JWT token
          var user_sess_token  = auth.genrateJWTEncryptedToken(128,user.id);
          console.log("JWT + custom token",user_sess_token);
  
          //Create Refresh token 
          const refreshToken = commonServices.refreshToken(45)
          const update = { user_sess_token: user_sess_token, refreshToken: refreshToken };
  
          // Refresh token updated in DB..
          let userDetail = await User.findOneAndUpdate({ email }, update);
  
          // save user token
          userDetail.token = user_sess_token;
          userDetail.refreshToken = refreshToken;
          
          // user
          res.status(200).send({ status:true,message:"Great! Logged In successfully.",token:user_sess_token});
        }else{
          res.status(400).send({status:false, message:"Oop's! Invalid Credentials"});
        }
      } catch (err) {
        console.log(err);
      }
}


const getData = async(req,res,next) =>{
  const token = req.cookies.token;
  //console.log(token)
    // const { email } = req.body;
    try{
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      if(decoded.token){
        let user_id = commonServices.decryptToken(decoded.token);
        var user = await User.findById(user_id);
        res.render('dashboard/index', {user,token :decoded.token});
      }else{
        return res.redirect('/logout');
      }
    }catch(err){
      return res.redirect('/logout');
    }
}

const getAPIToken = async(req,res)=>{
  let user_id = commonServices.decryptToken(req.user);
  var user = await User.findById(user_id);
  res.status(200).send({ status:true, API_TOKEN:user.api_token});
}




module.exports = {
    register,
    login,
    getData,
    getAPIToken
};