const EmployeeDetails = require('../models').employeeDetails;
const Employees = require('../models').employees;

const createEmployeeDetails = async function(req,res,next){
  let [err,createEmployeeDetails] = await to(EmployeeDetails.create(req.body));
  if(err) return ReE(res,err,422);
  return ReS(res,{createEmployeeDetails})
}
module.exports.createEmployeeDetails = createEmployeeDetails;

const getEmployeeDetails = async function(req,res,next){
  let [err,getEmployeeDetails] = await to(EmployeeDetails.findAll(
    {
      include:[{
        model:Employees,
        attributes:['Employee_Identification_Code']
      }]
    }
  ));
  if(err) return ReE(res,err,422);
  return ReS(res,{getEmployeeDetails})
}
module.exports.getEmployeeDetails = getEmployeeDetails;