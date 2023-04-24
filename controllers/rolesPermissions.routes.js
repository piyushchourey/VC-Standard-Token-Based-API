const RolesPermission = require("./../models/rolesPermissions");
var commonServices = require("./../middleware/commonServices");

const add = async(req, res, next) => {
    console.log(req.body);
    try {
      // Get roles input
      const { roles_id, perm_id } = req.body;
  
      // Validate roles input
      if (!(roles_id && perm_id)) {
        res.status(400).send({message: "All input is required"});
      }
      
      // Create role in our database
      const role = await RolesPermission.create({
        roles_id,
        perm_id,
      });
  
      // return new user
      res.status(201).json(role);
    } catch (err) {
      console.log(err);
    }
};

const getData = async(req,res,next) =>{
    try{
        let findObject = {};
      const rolesPermission = await RolesPermission.find(findObject);
      res.status(200).send({data:rolesPermission});
    }catch(err){
      res.status(400).send({message:err.message});
    }
}

module.exports = {
    add,
    getData
};