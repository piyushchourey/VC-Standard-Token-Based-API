const User = require("./../models/user");
var bcrypt = require('bcryptjs');
const auth = require("./../middleware/auth");
var commonServices = require("./../middleware/commonServices");
var _ = require('lodash');

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
        return res.status(409).send({status:false,message:"User Already Exist. Please Login"});
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      var user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword
      });

      var user1 =  _.omit(user, ['_id', 'password','__v']);
      console.log(user1);
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
          var token  = auth.genrateJWTEncryptedToken(128,user.id);
          console.log("JWT + custom token",token);
  
          //Create Refresh token 
          const refreshToken = commonServices.refreshToken(45)
          const update = { refreshToken: refreshToken };
  
          // Refresh token updated in DB..
          let userDetail = await User.findOneAndUpdate({ email }, update);
  
          // save user token
          userDetail.token = token;
          userDetail.refreshToken = refreshToken;
          localStorage.setItem("auth-token",token);
          // user
          res.status(200).send({ status:true,message:"Great! Logged In successfully.",token:token});
        }else{
          res.status(400).send({status:false, message:"Oop's! Invalid Credentials"});
        }
      } catch (err) {
        console.log(err);
      }
}


const getData = async(req,res,next) =>{
    const { email } = req.body;
    try{
      const user = await User.findOne({ email }).populate("role_id");
      return res.status(200).json({msg: "Welcome to blinkly 🙌 ", user});
    }catch(err){
      res.status(400).send({message:err.message});
    }
}

module.exports = {
    register,
    login,
    getData
};