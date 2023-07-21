const Role = require('../models').role;
const { count } = require('rxjs');
const { sequelize } = require('../models');
const { Op } = require("sequelize");
const Employees = require('../models').employees;


const getRole = async function (req, res, next) {
  let err, passport;
  [err, passport] = await to(Role.findAll());
  if (err) return ReE(res, err, 422);
  if (passport) return ReS(res, { passport });
}
module.exports.getRole = getRole;

const createRole = async function (req, res, next) {
  let err, passport;
  let data = req.body;
  [err, passport] = await to(Role.create(data));
  if (err) return ReE(res, err, 422);
  if (passport) return ReS(res, { passport });
}
module.exports.createRole = createRole;

const getRoles = async function (req, res, next) {
  let err, role;
  let data = req.body;
  console.log(data.id);
  [err, role] = await to(Role.findOne({
    where: {
      id: req.body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  if (role) return ReS(res, { role });
}
module.exports.getRoles = getRoles;

const updateRole = async function (req, res, next) {
  let err, Role;
  let data = req.body.data;
  console.log("department", data);
  [err, Role] = await to(Role.update(data, {
    where: {
      id: req.body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { Role });
}
module.exports.updateRole = updateRole;

const deleteRole = async function (req, res, next) {
  let deleterole, err;
  let data = req.body;
  [err, deleterole] = await to(Role.destroy({
    where: {
      id: req.body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { deleterole })
}
module.exports.deleteRole = deleteRole;

const getRolesCount = async function (req, res, next) {
  let [err, roleCount] = await to(Role.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'RolesCount']],
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { roleCount });
}
module.exports.getRolesCount = getRolesCount;

const getAllEmployeesRole = async function (req, res, next) {
  let [err, getAllEmployeesRole] = await to(Role.findAll({
    attributes: ['name'],
    include: [{
      model: Employees,
      attributes: ['firstname', 'lastname']
    }]
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { getAllEmployeesRole });
}
module.exports.getAllEmployeesRole = getAllEmployeesRole;

const getRolesByGroup = async function (req, res, next) {
  let [err, getRolesByGroup] = await to(Role.findAll({
    attributes: ['name'],
    include: [{
      model: Employees,
      attributes: ['salary', 'firstname']
    }]
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { getRolesByGroup });
}
module.exports.getRolesByGroup = getRolesByGroup;