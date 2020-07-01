'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
<<<<<<< HEAD
   return queryInterface.createTable('tournois', 
=======
   return queryInterface.createTable('tournoi', 
>>>>>>> 436690aa71ca9e6064d3b3ebe8e77a5780a9e869
   {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
      name: {
      type: Sequelize.STRING
<<<<<<< HEAD
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
=======
>>>>>>> 436690aa71ca9e6064d3b3ebe8e77a5780a9e869
    }
   }
   );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
<<<<<<< HEAD
   return queryInterface.dropTable('tournois');
=======
>>>>>>> 436690aa71ca9e6064d3b3ebe8e77a5780a9e869
  }
};
