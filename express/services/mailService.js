const nodemailer = require('nodemailer');
require('../global_function');
require("../config/config")

const sendMail = async function(toMail,mailContent,keyobject){
  let err,response;

  const sender = nodemailer.createTransport({
    service: 'ionos',
    auth:{
      user:CONFIG.user,
      pass:CONFIG.pass
    },
    host:"smtp.ionos.com",
    port:465
  });
  
  for( let key in keyobject){
    const replaceText = "%" + key + "%"  ;
    const replaceRegExp = new RegExp(replaceText,'g');
    mailContent = mailContent.replace(replaceRegExp,keyobject[key])
  }
  const composeMail = {
    from:'priyadharshini@centizen.com',
    to:[toMail,'priyadharshini@centizen.com'],
    subject:"Test Mail",
    html:mailContent
  }
  console.log("mailService");
  [err,response]=await to(sender.sendMail(composeMail));
  if(err) return ReE(res,err,422);
  if(response) return ReS(res,{response});
}
module.exports.sendMail =sendMail;