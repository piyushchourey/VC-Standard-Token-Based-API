const User = require("./../models/user");
const auth = require("./../middleware/auth");
var commonServices = require("./../middleware/commonServices");

const getAuthenticateData = async(req,res,next)=>{
    let user_id = commonServices.decryptToken(req.user);
    var user = await User.findById(user_id);
    res.render('dashboard/authentication', {user});
}



module.exports = {
    getAuthenticateData
}