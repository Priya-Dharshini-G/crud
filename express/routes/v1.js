var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../middleware/passport')(passport);

const userController = require('../controllers/userController')
router.post('/login',userController.login);

const EmployeeController = require('../controllers/employeeController');
router.post('/createEmployee',EmployeeController.createEmployee);
router.get('/getEmployee',EmployeeController.getEmployee);
router.get('/getEmployeeParticular',passport.authenticate('jwt', { session: false }),EmployeeController.getEmployeeParticular);
router.post('/getEmployees',passport.authenticate('jwt', { session: false }),EmployeeController.getEmployees);
router.post('/updateEmployee',passport.authenticate('jwt', { session: false }),EmployeeController.updateEmployee);
router.post('/getDestroy',passport.authenticate('jwt', { session: false }),EmployeeController.getDestroy);
router.get('/getEmployeesCount',passport.authenticate('jwt', { session: false }),EmployeeController.getEmployeesCount);
router.get('/getAllEmployeesSalary',passport.authenticate('jwt', { session: false }),EmployeeController.getAllEmployeesSalary);
router.post('/getSpecificDept',passport.authenticate('jwt', { session: false }),EmployeeController.getSpecificDept);
router.post('/getSpecificRoles',passport.authenticate('jwt', { session: false }),EmployeeController.getSpecificRole);
router.post('/getSpecificSalary',passport.authenticate('jwt', { session: false }),EmployeeController.getSpecificSalary);
router.post('/changePasswrd',passport.authenticate('jwt', { session: false }),EmployeeController.changePasswrd);
router.get('/getEmployeesSalary',passport.authenticate('jwt', { session: false }),EmployeeController.getEmployeesSalary);
router.get('/getEmployeesDept',passport.authenticate('jwt', { session: false }),EmployeeController.getEmployeesDept);
router.get('/getEmployeesRoles',passport.authenticate('jwt', { session: false }),EmployeeController.getEmployeesRoles);
router.get('/getEmpYrCount',passport.authenticate('jwt', { session: false }),EmployeeController.getEmpYrCount);



const departmentController = require('../controllers/departmentController');
router.post('/createDepartment',departmentController.createDepartment);
router.get('/getDepartment',passport.authenticate('jwt', { session: false }),departmentController.getDepartment);
router.post('/getDepartments',passport.authenticate('jwt', { session: false }),departmentController.getDepartments);
router.post('/updateDepartment',passport.authenticate('jwt', { session: false }),departmentController.updateDepartment);
router.post('/deleteDept',passport.authenticate('jwt', { session: false }),departmentController.deleteDept);
router.get('/getDeptCount',passport.authenticate('jwt', { session: false }),departmentController.getDeptCount);
router.get('/getAllEmployeesDept',passport.authenticate('jwt', { session: false }),departmentController.getAllEmployeesDept)


const roleController = require('../controllers/roleController');
router.post('/createRole',roleController.createRole);
router.get('/getRole',passport.authenticate('jwt', { session: false }),roleController.getRole);
router.post('/getRoles',passport.authenticate('jwt', { session: false }),roleController.getRoles);
router.post('/updateRole',passport.authenticate('jwt', { session: false }),roleController.updateRole);
router.post('/deleteRole',passport.authenticate('jwt', { session: false }),roleController.deleteRole);
router.get('/getRolesCount',passport.authenticate('jwt', { session: false }),roleController.getRolesCount);
router.get('/getAllEmployeesRole',passport.authenticate('jwt', { session: false }),roleController.getAllEmployeesRole);
router.get('/getRolesByGroup',passport.authenticate('jwt', { session: false }),roleController.getRolesByGroup);


const profileController = require('../controllers/profileController');
router.post('/createProfile',profileController.upload,profileController.createProfile);

const eventController = require('../controllers/eventController');
router.get('/getEvents',passport.authenticate('jwt', { session: false }),eventController.getEvents);
router.post('/createEvents',passport.authenticate('jwt', { session: false }),eventController.createEvents);
router.get('/getUpcomingEvents',passport.authenticate('jwt', { session: false }),eventController.getUpcomingEvents);

const contactDetailsController = require('../controllers/contactDetailsController');
router.post('/createContacts',contactDetailsController.createContacts);
router.get('/getContacts',passport.authenticate('jwt', { session: false }),contactDetailsController.getContacts);

const employeeDetailsController = require('../controllers/employeeDetailsController');
router.post('/createEmployeeDetails',employeeDetailsController.createEmployeeDetails);
router.get('/getEmployeeDetails',passport.authenticate('jwt', { session: false }),employeeDetailsController.getEmployeeDetails);

const jobDetailsController  = require('../controllers/jobDetailsController');
router.post('/createJobDetails',jobDetailsController.createJobDetails);
router.get('/getJobDetails',passport.authenticate('jwt', { session: false }),jobDetailsController.getJobDetails);


module.exports = router;
