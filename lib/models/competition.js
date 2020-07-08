'use strict';
module.exports = (sequelize, DataTypes) => {
  const Competition = sequelize.define('Competition', {
    name_organisateur: DataTypes.STRING,
    name: DataTypes.STRING,
    nb_participant: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    vainqueur: DataTypes.INTEGER
  }, {});
  Competition.associate = function(models) {
    // associations can be defined here
    Competition.hasMany(models.Match, {foreignKey: 'competition', sourceKey: 'id'});
    Competition.belongsTo(models.Participant, {as: 'vainqueur_competition', foreignKey: 'vainqueur', sourceKey: 'id'});
  };
  return Competition;
};