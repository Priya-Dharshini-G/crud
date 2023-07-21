'use strict';

module.exports = (sequelize,DataTypes) =>{
  var Model = sequelize.define('events',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    Event_name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    Event_date:{
      type:DataTypes.DATEONLY,
      allowNull:false
    },
    description:{
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
    tableName:'events'
  });

  Model.associate = function(models){
  
  }
  return Model;
}