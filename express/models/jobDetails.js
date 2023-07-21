'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('jobDetails', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employeesId:{
       type:DataTypes.INTEGER
    },
    Job_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Skills_and_expertise: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Current_Projects: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { tableName: 'jobDetails' });
  Model.associate = function (models) {
     this.employeesId = this.belongsTo(models.employees);
  }

  return Model;
}