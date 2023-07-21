const ContactDetails = require('../models').contactDetails;
const Employees = require('../models').employees;


const createContacts = async function(req,res,next){
  let [err,createContacts] = await to(ContactDetails.create(req.body));
  if(err) return ReE(res,err,422);
  return ReS(res,{createContacts})
}
module.exports.createContacts = createContacts;

const getContacts = async function(req,res,next){
  let [err,getContacts] = await to(ContactDetails.findAll(
    {
      include:[{
        model:Employees,
        attributes:['Employee_Identification_Code']
      }]
    }
  ));
  if(err) return ReE(res,err,422);
  return ReS(res,{getContacts})
}
module.exports.getContacts = getContacts;