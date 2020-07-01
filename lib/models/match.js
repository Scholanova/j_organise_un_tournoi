'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    p1: DataTypes.INTEGER,
    p2: DataTypes.INTEGER,
    score1: DataTypes.INTEGER,
    score2: DataTypes.INTEGER
  }, {});
  Match.associate = function(models) {
    // associations can be defined here
  };
  return Match;
};