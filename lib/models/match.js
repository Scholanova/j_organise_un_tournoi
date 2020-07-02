'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define("Match", {
    competition: DataTypes.INTEGER,
    p1: DataTypes.INTEGER,
    p2: DataTypes.INTEGER,
    score1: DataTypes.INTEGER,
    score2: DataTypes.INTEGER
  },{});
  Match.associate = function(models) {
    // associations can be defined here
    Match.belongsTo(models.Competition, {foreignKey: 'competition', sourceKey: 'id'});
    Match.belongsTo(models.Participant, {as: 'player1', foreignKey: 'p1', sourceKey: 'id'});
    Match.belongsTo(models.Participant, {as: 'player2', foreignKey: 'p2', sourceKey: 'id'});
  };
  return Match;
};