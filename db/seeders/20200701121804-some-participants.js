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
   return queryInterface.bulkInsert('Participants',[
    {
      id:1,
      name:'Aurelien',
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
    },
    {
      id:2,
      name:'Djibril',
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
    },
    {
      id:3,
      name:'Nacer',
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
    },
    {
      id:4,
      name:'Benoit',
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
    },
    {
      id:5,
      name:'CyrYl',
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
    },
    {
      id:6,
      name:'Rémy',
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
    },
    {
      id:7,
      name:'Eva',
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
    },
    {
      id:8,
      name:'François',
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
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
  }
};
