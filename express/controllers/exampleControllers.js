const Employees = require('../models').employees;
const JobDetails = require('../models').jobDetails;
const Department = require('../models').department;
const { sequelize } = require('../models');
const { Op } = require("sequelize");


const findSalary = async function (req, res, next) {
  let [err, salary] = await to(Employees.findAll({
    attributes: ['salary']
  }));
  if (err) return ReE(res,err,422);
  return ReS(res, { salary });
}
module.exports.findSalary = findSalary;


const uniqeDesignation = async function (req, res, next) {
  let [err, designation] = await to(Employees.findAll({
    attributes: ['departmentId'],
    distinct:true,
    include: [{
      model: Department,
      attributes: ['name']
    }
    ],
    group: ['departmentId']
  }));
  if (err) return ReE(res,err,422);
  return ReS(res, { designation });
}
module.exports.uniqeDesignation = uniqeDesignation;

const salaryInc = async function(req,res,next){
  let [err,salaryInc] =  await to(Employees.findAll({
     attributes: ['firstname','salary' ] ,
     where:{
      'salary':'salary'*1.15
     }
  }));
  if (err) return ReE(res,err,422);
  return ReS(res, { salaryInc });
}
module.exports.salaryInc = salaryInc;
