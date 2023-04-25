const Role = require("./../models/roles");
var commonServices = require("./../middleware/commonServices");

const add = async(req, res, next) => {
    try {
      // Get roles input
      const { roles_name, roles_description } = req.body;
  
      // Validate roles input
      if (!(roles_name && roles_description)) {
        res.status(400).send({message: "All input is required"});
      }
      
      // check if role already exist
      const oldRole = await Role.findOne({ roles_name });
  
      if (oldRole) {
        return res.status(409).send({message:"Role name Already Exist."});
      }
  
      // Create role in our database
      const role = await Role.create({
        roles_name,
        roles_description,
      });
  
      // return new user
      res.status(201).json(role);
    } catch (err) {
      console.log(err);
    }
};

const getData = async(req,res,next) =>{
    const { role_name } = req.body;
    try{
        let findObject = {};
        if(role_name){
            findObject.push(role_name);
        }
      const roles = await Role.find(findObject);
      res.status(200).send({data:roles});
    }catch(err){
      res.status(400).send({message:err.message});
    }
}

module.exports = {
    add,
    getData
};