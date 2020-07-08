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

   return queryInterface.bulkInsert('Matches',[
    {
      id:42000,
      competition:42000,
      p1:42001,
      p2:42002,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 42001
    },
    {
      id:42001,
      competition:42000,
      p1:42003,
      p2:42004,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 42003
    },
    {
      id:42002,
      competition:42000,
      p1:42005,
      p2:42006,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 42005
    },
    {
      id:42003,
      competition:42000,
      p1:42007,
      p2:42008,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 42007
    },
    {
      id:42004,
      competition:42000,
      p1:42001,
      p2:42003,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 42001
    },
    {
      id:42005,
      competition:42000,
      p1:42005,
      p2:42007,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 42005
    },
    {
      id:42006,
      competition:42000,
      p1:42001,
      p2:42005,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 42001
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
   return queryInterface.bulkDelete('Matches', null, {});
  }
};
