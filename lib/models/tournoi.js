'use strict'
module.exports = (sequelize, DataTypes) => {
  const tournoi = sequelize.define('tournoi', {
    name: DataTypes.STRING,
}, {})
  return tournoi
}