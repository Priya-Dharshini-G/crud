'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('contactDetails', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employeesId:{
       type:DataTypes.INTEGER
    },
    Contact_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EmergencyContactNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EmergencyContactPerson: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Mediclaim_details_provided:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, { tableName: 'contactDetails' });
  Model.associate = function (models) {
     this.employeesId = this.belongsTo(models.employees);
  }
  return Model;
}