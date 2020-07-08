'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Competitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      nb_participant: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status:{
        defaultValue:true,
        type: Sequelize.BOOLEAN
      },
      name_organisateur:{
        allowNull: false,
        type: Sequelize.STRING
      },
      vainqueur: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Participants',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Competitions');
  }
};