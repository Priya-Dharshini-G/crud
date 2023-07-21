var express = require('express');
var router = express.Router();

const ExampleControllers = require('../controllers/exampleControllers')
router.get('/findSalary',ExampleControllers.findSalary);
router.get('/uniqeDesignation',ExampleControllers.uniqeDesignation);
router.get('/salaryInc',ExampleControllers.salaryInc);

module.exports = router;