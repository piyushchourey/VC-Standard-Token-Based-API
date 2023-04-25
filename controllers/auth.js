const User = require("./../models/user");
const auth = require("./../middleware/auth");

const getRefreshToken = async(req,res,next)=>{
    const { email } = req.body;
    try{
        if(!email){
            res.status(400).send({message:"Email ID is required for refresh token."});
        }else{
            const user = await User.findOne({ email });
            if (user) {
                res.status(200).send({refreshToken:user.refreshToken});
            }else{
                res.status(400).send({message:"User does not exist with this details."});
            }
        }
    }catch(err){
        res.status(400).send({message:err.message});
    }
}

const genrateNewToken = async(req,res,next)=>{
    const { refreshToken } = req.body;
    try{
        if(!refreshToken){
            res.status(400).send({message:"Refresh Token is required for new token."});
        }else{
            const user = await User.findOne({ refreshToken });
            
            if (user) {
              // Genrate new JWT token
              var token  = auth.genrateJWTEncryptedToken(128,user.id);
             
              res.status(200).send({"Message":'New Token Genrated Successfully.',token:token});
            }else{
                res.status(400).send({message:"User does not exist with this details."});
            }
        }
    }catch(err){
        res.status(400).send({message:err.message});
    }
}

module.exports = {
    getRefreshToken,
    genrateNewToken
}