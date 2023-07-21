const authService = require('../services/authService');
const randToken = require('rand-token');
const refreshTokens = {};

const login = async function(req,res,next){
  let err,user;
  let userAccount=req.body;
  [err,user]=await to(authService.auth(userAccount));
  if(user){
    let token;
    delete user.dataValues.password;
    var refreshToken= randToken.uid(256);
    refreshTokens[refreshToken]={
      user:user
    };
    [err,token]=await to(user.getJWT());
    console.log("token",token);
    if(err) return ReE(res,err,422);
    return ReS(res,{token:token,refreshToken:refreshToken,user:user});
  }
  if(err) return ReE(res,err,422);
}
module.exports.login=login;