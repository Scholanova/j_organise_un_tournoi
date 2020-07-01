'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    name: DataTypes.STRING
  }, {});
  Participant.associate = function(models) {
    // associations can be defined here
    Participant.hasMany(models.Match, {foreignKey: 'p1', sourceKey: 'id'});
    Participant.hasMany(models.Match, {foreignKey: 'p2', sourceKey: 'id'});
  };
  return Participant;
};