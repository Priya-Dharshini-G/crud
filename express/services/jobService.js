const job = require('cron');
const moment = require('moment');
const Employee = require('../models').employees;
const mailService = require('./mailService');
require('../global_function');

const sendBirthWish = async function () {
  console.log("BirthDay Wish JobService");
  const birthDayJob = new job.CronJob('* * * * * *', async function () {
    console.log("inside Job Service");
    let err, employeeDetails;
    [err, employeeDetails] = await to(Employee.findAll());
    if (employeeDetails && employeeDetails.length) {
      for (let i = 0; i < employeeDetails.length; i++) {
        let date = moment.utc(employeeDetails[i].dob).format('YYYY-MM-DD');
        if ((new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + (new Date().getDate())).slice(-2)) === date) {
          console.log("inside If");
          let [error, birthdayResponse] = await to(mailService.sendMail(employeeDetails[i].email,
            "Many more happy returns of the Day %employeeName% . Have a great year ahead",
            {
              employeeName: employeeDetails[i].firstname
            }));
        }
      }
    }
  });
  birthDayJob.stop();
}
module.exports.sendBirthWish = sendBirthWish;