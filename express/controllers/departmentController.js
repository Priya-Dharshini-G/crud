const Department = require('../models').department;
const { count } = require('rxjs');
const { sequelize } = require('../models');
const { Op } = require("sequelize");
const Employees = require('../models').employees;

const getDepartment = async function(req,res,next){
  let err,department;
  [err,department]=await to(Department.findAll());
  if(err) return ReE(res,err,422);
  if(department) return ReS(res,{department});
}
module.exports.getDepartment=getDepartment;

const createDepartment = async function(req,res,next){
  let err,department;
  let data=req.body;
  [err,department]=await to(Department.create(data));
  if(err) return ReE(res,err,422);
  if(department) return ReS(res,{department});
}
module.exports.createDepartment=createDepartment;

const getDepartments = async function(req,res,next){
  let err,department;
  let data=req.body;
  [err,department]=await to(Department.findOne({
    where:{
      id:data.id
    }
  }));
  if(err) return ReE(res,err,422);
  if(department) return ReS(res,{department});
}
module.exports.getDepartments=getDepartments;

const updateDepartment = async function(req,res,next){
  let err,department;
  let data=req.body.data;
  console.log("department",data);
  [err,department]=await to(Department.update(data,{
    where:{
      id:req.body.id
    }
  }));
  if(err) return ReE(res,err,422);
  if(department) return ReS(res,{department});
}
module.exports.updateDepartment=updateDepartment;

const deleteDept = async function(req,res,next){
  let deletedept,err;
  let data=req.body;
  [err,deletedept]=await to(Department.destroy({
   where:{
     id:data.id
   }
  }));
  if(err) return ReE(res,err,422);
  return ReS(res,{deletedept})
}
module.exports.deleteDept = deleteDept;


const getDeptCount = async function(req,res,next){
  let [err,departmentCount] = await to (Department.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'deptsCount']],
  }));
  if(err) return ReE(res,err,422);
  return ReS(res,{departmentCount});
}
module.exports.getDeptCount=getDeptCount;


const getAllEmployeesDept = async function(req,res,next){
  let [err,getAllEmployeesDept]=await to(Department.findAll({
     attributes:['name'],
     include:[
      {model:Employees,
    attributes:['firstname','lastname']}
    ]
  }));
  if(err) return ReE(res,err,422);
  return ReS(res,{getAllEmployeesDept});
}
module.exports.getAllEmployeesDept=getAllEmployeesDept;
