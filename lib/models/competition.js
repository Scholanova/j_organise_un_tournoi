'use strict';
module.exports = (sequelize, DataTypes) => {
  const Competition = sequelize.define('Competition', {
    name: DataTypes.STRING,
    nb_participant: DataTypes.INTEGER
  }, {});
  Competition.associate = function(models) {
    // associations can be defined here
    Competition.hasMany(models.Match, {foreignKey: 'competition', sourceKey: 'id'});
  };
  return Competition;
};