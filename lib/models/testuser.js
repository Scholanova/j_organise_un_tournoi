'use strict';
module.exports = (sequelize, DataTypes) => {
  const TestUser = sequelize.define('TestUser', {
    name: DataTypes.STRING
  }, {});
  TestUser.associate = function(models) {
    // associations can be defined here
  };
  return TestUser;
};