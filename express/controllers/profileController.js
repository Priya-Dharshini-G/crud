const Profile = require('../models').profile;
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'Images')
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now() + path.extname(file.originalname))
  }
});
const upload =multer({
  storage:storage,
  limits:{fileSize : '1000000'},
  fileFilter:(req,file,cb)=>{
    const fileTypes =/jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if(mimeType && extname) {
      return cb(null,true)
    }
    cb('Give proper files formats to upload')
  }
}).single('UserImage')
module.exports.upload =upload;

const createProfile = async function (req, res, next) {
  console.log(req.file.path);
  let [err, profile] = await to(Profile.create({UserImage:req.file.path}));
  if (err) return ReE(err, res, 422);
  return ReS(res, { profile });
}
module.exports.createProfile = createProfile;