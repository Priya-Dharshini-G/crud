'use strict';

const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const crytoService = require('../services/cryptoService');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('employees', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Employee_Identification_Code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileId: {
      type: DataTypes.INTEGER
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departmentId: {
      type: DataTypes.INTEGER
    },
    roleId: {
      type: DataTypes.INTEGER
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    modified: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, { tableName: 'employees' });
  Model.associate = function (models) {
    this.departmentId = this.belongsTo(models.department);
    this.roleId = this.belongsTo(models.role);
    this.profileId = this.belongsTo(models.profile);
    // this.reportingManagerId = this.belongsTo(models.employees, { as: 'reportingManager', foreignKey: 'reportingManagerId' });
    // this.reportingManagerId = this.hasMany(models.employees, { foreignKey: 'reportingManagerId' });
    this.contactDetails = this.hasOne(models.contactDetails);
    this.employeeDetails = this.hasOne(models.employeeDetails);
    this.jobDetails = this.hasOne(models.jobDetails);
  }

  Model.beforeSave(async (user, options) => {
    let err;
    if (user.changed('password')) {
      let salt, hash;
      let rounds = Math.floor(Math.random() * 6 + 4);
      console.log('Rounds: ', rounds);
      [err, salt] = await to(bcrypt.genSalt(rounds));
      console.log('Salt: ', salt);
      if (err) {
        console.log('error in encryption in user account' + err.message);
      };
      [err, hash] = await to(bcrypt.hash(user.password, salt));
      console.log('Hash: ', hash);
      if (err) {
        console.log('error in hash method in encryption' + err.message);
      };
      user.password = hash;
    }
  });
  Model.prototype.comparePassword = async function (pw) {
    let err, passwrd;
    if (!this.password) TE(ERROR.password_notset);
    [err, passwrd] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);
    if (!passwrd) TE(ERROR.invalid_credentials);
    return this;
  };

  Model.prototype.getJWT = async function () {
    let err, encryptedToken;
    const token = "Bearer " + jwt.sign({
      id: this.id,
      email: this.email,
      roleId: this.roleId
    }, CONFIG.jwt_encryption, { expiresIn: CONFIG.jwt_expiration });
    [err, encryptedToken] = await to(crytoService.encrypt(token));
    console.log("encryptedToken", encryptedToken);
    if (err) TE(err);
    return encryptedToken;
  }
  return Model;
}
