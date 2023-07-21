'use strict';

module.exports = (sequelize,DataTypes) =>{
  var Model = sequelize.define('profile',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    UserImage:{
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
    tableName:'profile'
  });

  Model.associate = function(models){
   this.employees = this.hasOne(models.employees);
  }
  return Model;
}