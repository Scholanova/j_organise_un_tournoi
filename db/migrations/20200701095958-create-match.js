'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      competition: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Competitions',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      p1: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Participants',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      p2: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Participants',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      score1: {
        type: Sequelize.INTEGER
      },
      score2: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Matchs');
  }
};