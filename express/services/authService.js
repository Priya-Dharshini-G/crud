const validator=require('validator');
const employee=require('../models').employees;
const Profile = require('../models').profile;
const auth= async function(userAccount){
  let email=userAccount.email;
  console.log(email);
  let err,user;
  if(validator.isEmail(email)){
    [err,user]=await to(employee.findOne({
      where:{
        email:email
      },
      include:[
        {model:Profile}
      ]
    }));
    if(err) TE(err.message);
    if(!user){
      TE(ERROR.invalid_credentials);
    }
  }
  else{
    TEXT(ERROR.invalid_email);
  }
  [err,user]=await to(user.comparePassword(userAccount.password));
  if(err) TE(err.message);

  return user;
}
module.exports.auth=auth;