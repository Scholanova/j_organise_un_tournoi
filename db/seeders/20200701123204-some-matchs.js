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
      id:1,
      competition:42000,
      p1:1,
      p2:2,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 1
    },
    {
      id:2,
      competition:42000,
      p1:3,
      p2:4,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 3
    },
    {
      id:3,
      competition:42000,
      p1:5,
      p2:6,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 5
    },
    {
      id:4,
      competition:42000,
      p1:7,
      p2:8,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 7
    },
    {
      id:5,
      competition:42000,
      p1:1,
      p2:3,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 1
    },
    {
      id:6,
      competition:42000,
      p1:5,
      p2:7,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 5
    },
    {
      id:7,
      competition:42000,
      p1:1,
      p2:5,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      vainqueur: 1
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
