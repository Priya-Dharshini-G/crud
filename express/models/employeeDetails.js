'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('employeeDetails', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employeesId:{
      type:DataTypes.INTEGER
    },
    Employee_Identification_Code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Employment_Type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Employment_Status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Date_of_Joining: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Name_of_Bank:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Bank_Account_number:{
      type: DataTypes.STRING,
      allowNull:false
    },
    IFSC_code:{
      type: DataTypes.STRING,
      allowNull:false
    },
    Work_week:{
      type: DataTypes.STRING,
      allowNull:false
    },
    Last_day_of_working:{
      type: DataTypes.STRING,
      allowNull:false
    }
  
  }, { tableName: 'employeeDetails' });
  Model.associate = function (models) {
   this.employeesId= this.belongsTo(models.employees);
  }
  return Model;
}