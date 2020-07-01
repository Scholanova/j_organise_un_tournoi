'use strict'
module.exports = (sequelize, DataTypes) => {
  const tournois = sequelize.define('tournois', {
    name: DataTypes.STRING,
}, {})
  return tournois
}