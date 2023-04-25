const Permission = require("./../models/permissions");
var commonServices = require("./../middleware/commonServices");

const add = async(req, res, next) => {
    try {
      // Get roles input
      const { perm_name, perm_description } = req.body;
  
      // Validate roles input
      if (!(perm_name && perm_description)) {
        res.status(400).send({message: "All input is required"});
      }
      
      // check if role already exist
      const oldPermission = await Permission.findOne({ perm_name });
  
      if (oldPermission) {
        return res.status(409).send({message:"Permission name Already Exist."});
      }
  
      // Create role in our database
      const role = await Permission.create({
        perm_name,
        perm_description,
      });
  
      // return new user
      res.status(201).json(role);
    } catch (err) {
      console.log(err);
    }
};

const getData = async(req,res,next) =>{
    const { perm_name } = req.body;
    try{
        let findObject = {};
        if(oldPermission){
            findObject.push(oldPermission);
        }
      const permission = await Permission.find(findObject);
      res.status(200).send({data:permission});
    }catch(err){
      res.status(400).send({message:err.message});
    }
}

module.exports = {
    add,
    getData
};