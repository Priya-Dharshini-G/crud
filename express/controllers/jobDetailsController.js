const JobDetails = require('../models').jobDetails;
const Employees = require('../models').employees;


const createJobDetails = async function(req,res,next){
  let [err,createJobDetails] = await to(JobDetails.create(req.body));
  if(err) return ReE(res,err,422);
  return ReS(res,{createJobDetails})
}
module.exports.createJobDetails = createJobDetails;

const getJobDetails = async function(req,res,next){
  let [err,getJobDetails] = await to(JobDetails.findAll(
    {
      include:[{
        model:Employees,
        attributes:['Employee_Identification_Code']
      }]
    }
  ));
  if(err) return ReE(res,err,422);
  return ReS(res,{getJobDetails});
}
module.exports.getJobDetails = getJobDetails;