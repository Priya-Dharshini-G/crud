const { count } = require('rxjs');
const { sequelize } = require('../models');
const { Op } = require("sequelize");
const mailService = require("../services/mailService");
const moment =require('moment');

const Employees = require('../models').employees;
const Department = require('../models').department;
const Role = require('../models').role;
//get all employees
const getEmployee = async function (req, res, next) {
  let err, employee;
  [err, employee] = await to(Employees.findAll({
    include: [
      {
        model: Department,
        attributes: ['name']
      },
      {
        model: Role,
        attributes: ['name']
      }],
  }));
  if (err) return ReE(res, err, 422);
  if (employee) return ReS(res, { employee });
}
module.exports.getEmployee = getEmployee;

//get particular attributes
const getEmployeeParticular = async function (req, res, next) {
  let err, employee;
  [err, employee] = await to(Employees.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('departmentId')), 'departmentCount']],
    group: ['department.id'],
    include: [{
      model: Department,
      attributes: ['name']
    }]
  }));
  if (err) return ReE(res, err, 422);
  if (employee) return ReS(res, { employee });
}
module.exports.getEmployeeParticular = getEmployeeParticular;


const createEmployee = async function (req, res, next) {
  let err, employee, error, mailResponse;
  let data = req.body;
  [err, employee] = await to(Employees.create(data));
  if (employee) {
    [error, mailResponse] = await to(mailService.sendMail(data.email, '%employeeName% your account created successfully on %email%', {
      employeeName: data.firstname + ' ' + data.lastname,
      email: data.email
    }));
  }
  if (err) return ReE(res, err, 422);
  console.log("employee", data);
  return ReS(res, { mailResponse });
}
module.exports.createEmployee = createEmployee;

const getEmployees = async function (req, res, next) {
  let err, employees;
  let data = req.body;
  console.log(data);
  [err, employees] = await to(Employees.findOne({
    where: {
      id: req.body.id
    }
  }));
  if (err) return ReE(err, res, 422);
  return ReS(res, { employees });
}
module.exports.getEmployees = getEmployees;

const updateEmployee = async function (req, res, next) {
  let employee, err;
  let data = req.body;
  [err, employee] = await to(Employees.update(data, {
    where: {
      id: req.body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  if (employee) return ReS(res, { employee });
}
module.exports.updateEmployee = updateEmployee;

const getDestroy = async function (req, res, next) {
  let employee, err;
  let data = req.body;
  [err, employee] = await to(Employees.destroy({
    where: {
      id: data.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { employee })
}
module.exports.getDestroy = getDestroy;


const getEmployeesCount = async function (req, res, next) {
  let [err, employeeCount] = await to(Employees.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'employeesCount']],
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { employeeCount });
}
module.exports.getEmployeesCount = getEmployeesCount;


const getAllEmployeesSalary = async function (req, res, next) {
  let [err, getAllEmployeesSalary] = await to(Employees.findAll({
    attributes: ['firstname', 'lastname', 'salary']
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { getAllEmployeesSalary })
}
module.exports.getAllEmployeesSalary = getAllEmployeesSalary;

const getSpecificDept = async function (req, res, next) {
  let [err, getSpecificDept] = await to(Employees.findAll({
    attributes: ['firstname', 'lastname'],
    include: [{
      model: Department,
      where: {
        name: req.body.name
      },
    }]
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { getSpecificDept })
}
module.exports.getSpecificDept = getSpecificDept;

const getSpecificRole = async function (req, res, next) {
  let [err, getSpecificRole] = await to(Employees.findAll({
    attributes: ['firstname', 'lastname'],
    include: [{
      model: Role,
      where: {
        name: req.body.name
      },
    }]
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { getSpecificRole })
}
module.exports.getSpecificRole = getSpecificRole;

const getSpecificSalary = async function (req, res, next) {
  console.log("inside getSpecificSalary");
  console.log(req.body.startAmount);
  console.log(req.body.EndAmount);
  let [err, getSpecificSalary] = await to(Employees.findAll({
    attributes: ['firstname', 'lastname', 'salary'],
    where: {
      salary: {
        [Op.between]: [req.body.startAmount, req.body.EndAmount]
      }
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { getSpecificSalary })
}
module.exports.getSpecificSalary = getSpecificSalary;

const changePasswrd = async function (req, res, next) {
  let [err, changePasswrd] = await to(Employees.update({ password: req.body.value.password }, {
    where: {
      id: req.body.id
    },
    individualHooks: true
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { changePasswrd })
}
module.exports.changePasswrd = changePasswrd;

const getEmployeesSalary = async function (req, res, next) {
  let [err, getEmployeesSalary] = await to(Employees.findAll({
    attributes: ['firstname', 'salary'],
    include: [{
      model: Role,
      attributes: ['name']
    }]
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { getEmployeesSalary })
}
module.exports.getEmployeesSalary = getEmployeesSalary;


const getEmployeesDept = async function (req, res, next) {
  let [err, getEmployeesDept] = await to(Employees.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('departmentId')), 'EmployeesCount']],
    include: [{
      model: Department,
      attributes: ['name']
    }],
    group: ['departmentId']
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { getEmployeesDept })
}
module.exports.getEmployeesDept = getEmployeesDept;

const getEmployeesRoles = async function (req, res, next) {
  let [err, getEmployeesRoles] = await to(Employees.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('roleId')), 'EmployeesCount']],
    include: [{
      model: Role,
      attributes: ['name']
    }],
    group: ['roleId']
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { getEmployeesRoles });
}
module.exports.getEmployeesRoles = getEmployeesRoles;

const getEmpYrCount = async function (req, res, next) {
  let [err, getEmpYrCount] = await to(Employees.findAll({
    attributes: [
      [sequelize.fn("YEAR",sequelize.col("hire_date")), "Year"],
      [sequelize.fn("count", "*"), "count"],
    ],
    group: ["Year"],
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { getEmpYrCount });
}
module.exports.getEmpYrCount = getEmpYrCount;
 


