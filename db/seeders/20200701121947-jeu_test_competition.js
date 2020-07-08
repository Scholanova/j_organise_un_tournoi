'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Competitions',[
      {
        id:42000,
        name:'tounoi smash bros ultimate',
        nb_participant:8,
        createdAt: new Date('2020-06-28T15:24:00'),
        updatedAt: new Date('2020-07-02T03:56:00'),
        status:true,
        vainqueur : 42001,
        name_organisateur : 'Benoit'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Competitions', null, {});
  }
};
