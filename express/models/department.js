'use strict';

module.exports = (sequelize,DataTypes) =>{
  var Model = sequelize.define('department',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    created:{
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW,
      allowNull:false
    },
    modified:{
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW,
      allowNull:false
    }
  },{
    tableName:'department'
  });

  Model.associate = function(models){
   this.employees = this.hasMany(models.employees);
  }
  return Model;
}